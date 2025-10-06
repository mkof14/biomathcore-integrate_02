import { getPrisma } from "@/server/util/prisma";

type Search = {
  userId?: string;
  from?: string; // YYYY-MM-DD
  to?: string; // YYYY-MM-DD
  status?: "all" | "ok" | "fallback" | "error" | "rate-limit";
};

function parseSearch(
  sp: Record<string, string | string[] | undefined>,
): Search {
  const takeStr = (k: string) => {
    const v = sp[k];
    if (Array.isArray(v)) return v[0] ?? "";
    return v ?? "";
  };
  const userId = takeStr("userId")?.trim();
  const from = takeStr("from")?.trim();
  const to = takeStr("to")?.trim();
  const statusRaw = (takeStr("status")?.trim() || "all") as Search["status"];
  const status: Search["status"] = [
    "all",
    "ok",
    "fallback",
    "error",
    "rate-limit",
  ].includes(statusRaw)
    ? statusRaw
    : "all";
  return {
    userId: userId || undefined,
    from: from || undefined,
    to: to || undefined,
    status,
  };
}

function toDateOrNull(s?: string) {
  if (!s) return null;
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], 0, 0, 0));
  if (isNaN(d.getTime())) return null;
  return d;
}

function fmt(n: number | null | undefined) {
  if (n == null) return "-";
  return Intl.NumberFormat().format(n);
}

export default async function AssistantMonitor({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const prisma = getPrisma();
  const now = new Date();

  // --- read filters from URL
  const q = parseSearch(searchParams ?? {});
  const fromDate = toDateOrNull(q.from);
  const toDate = toDateOrNull(q.to);
  // включаем конец дня "to" (23:59:59.999 UTC) если задан
  const toDateEnd = toDate
    ? new Date(toDate.getTime() + 24 * 3600 * 1000 - 1)
    : null;

  // base where for filters
  const where: any = {};
  if (q.userId) {
    // частичный поиск по userId, без регистра
    where.userId = { contains: q.userId, mode: "insensitive" };
  }
  if (fromDate || toDateEnd) {
    where.createdAt = {};
    if (fromDate) (where.createdAt as any).gte = fromDate;
    if (toDateEnd) (where.createdAt as any).lte = toDateEnd;
  }
  if (q.status && q.status !== "all") {
    where.status = q.status;
  }

  // --- aggregates
  const dayAgo = new Date(now.getTime() - 24 * 3600 * 1000);
  const weekAgo = new Date(now.getTime() - 7 * 24 * 3600 * 1000);

  // агрегаты считаем с учётом фильтров
  const [last50, totalCount, fallbackCount, avgDur, weekCount, weekFallback] =
    await Promise.all([
      prisma.aIRun.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
      prisma.aIRun.count({ where }),
      prisma.aIRun.count({ where: { ...where, fallback: true } }),
      prisma.aIRun.aggregate({ where, _avg: { duration: true } }),
      prisma.aIRun.count({
        where: {
          ...where,
          createdAt: { ...(where.createdAt ?? {}), gte: weekAgo },
        },
      }),
      prisma.aIRun.count({
        where: {
          ...where,
          createdAt: { ...(where.createdAt ?? {}), gte: weekAgo },
          fallback: true,
        },
      }),
    ]);

  const totalFallbackPct = totalCount
    ? Math.round((fallbackCount / totalCount) * 100)
    : 0;
  const weekFallbackPct = weekCount
    ? Math.round((weekFallback / weekCount) * 100)
    : 0;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Assistant Monitor</h1>

      {/* Filters */}
      <form
        className="grid grid-cols-1 md:grid-cols-5 gap-3 rounded-2xl p-4 shadow bg-white"
        method="get"
      >
        <div className="flex flex-col">
          <label className="text-xs text-gray-500">User ID (contains)</label>
          <input
            name="userId"
            defaultValue={q.userId ?? ""}
            className="border rounded-md px-2 py-1"
            placeholder="U1001"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-500">From (UTC)</label>
          <input
            name="from"
            type="date"
            defaultValue={q.from ?? ""}
            className="border rounded-md px-2 py-1"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-500">To (UTC)</label>
          <input
            name="to"
            type="date"
            defaultValue={q.to ?? ""}
            className="border rounded-md px-2 py-1"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-500">Status</label>
          <select
            name="status"
            defaultValue={q.status ?? "all"}
            className="border rounded-md px-2 py-1"
          >
            <option value="all">All</option>
            <option value="ok">ok</option>
            <option value="fallback">fallback</option>
            <option value="error">error</option>
            <option value="rate-limit">rate-limit</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            className="px-3 py-2 rounded-lg border shadow-sm hover:bg-gray-50"
            type="submit"
          >
            Apply
          </button>
          <a
            href="/admin/assistant"
            className="ml-3 px-3 py-2 rounded-lg border shadow-sm hover:bg-gray-50"
          >
            Reset
          </a>
        </div>
      </form>

      {/* Summary cards (respecting filters) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500">Requests (filtered)</div>
          <div className="text-2xl font-semibold">{fmt(totalCount)}</div>
        </div>
        <div className="rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500">Fallback % (filtered)</div>
          <div className="text-2xl font-semibold">{fmt(totalFallbackPct)}%</div>
        </div>
        <div className="rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500">Avg duration (filtered)</div>
          <div className="text-2xl font-semibold">
            {fmt(Math.round(avgDur._avg.duration ?? 0))} ms
          </div>
        </div>
        <div className="rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500">Fallback % (7d, filtered)</div>
          <div className="text-2xl font-semibold">{fmt(weekFallbackPct)}%</div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl shadow overflow-x-auto bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-3 py-2">Time</th>
              <th className="text-left px-3 py-2">User</th>
              <th className="text-left px-3 py-2">Model</th>
              <th className="text-right px-3 py-2">Dur ms</th>
              <th className="text-right px-3 py-2">In</th>
              <th className="text-right px-3 py-2">Out</th>
              <th className="text-center px-3 py-2">Fallback</th>
              <th className="text-left px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {last50.map((r) => (
              <tr key={r.id} className="border-b last:border-0">
                <td className="px-3 py-2">
                  {new Date(r.createdAt).toLocaleString()}
                </td>
                <td className="px-3 py-2">{r.userId}</td>
                <td className="px-3 py-2">{r.model ?? "-"}</td>
                <td className="px-3 py-2 text-right">{fmt(r.duration)}</td>
                <td className="px-3 py-2 text-right">{fmt(r.tokensIn)}</td>
                <td className="px-3 py-2 text-right">{fmt(r.tokensOut)}</td>
                <td className="px-3 py-2 text-center">
                  {r.fallback ? "✔" : ""}
                </td>
                <td className="px-3 py-2">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500">
        * Filters apply to all metrics and the table above. Dates are
        interpreted in UTC (inclusive).
      </p>
    </div>
  );
}
