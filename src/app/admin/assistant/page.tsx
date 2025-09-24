import { getPrisma } from "@/server/util/prisma";

function fmt(n: number | null | undefined) {
  if (n == null) return "-";
  return Intl.NumberFormat().format(n);
}

export default async function AssistantMonitor() {
  const prisma = getPrisma();

  const now = new Date();
  const dayAgo = new Date(now.getTime() - 24 * 3600 * 1000);
  const weekAgo = new Date(now.getTime() - 7 * 24 * 3600 * 1000);

  const [last50, dayCount, dayFallback, dayAvgDur, weekCount, weekFallback] = await Promise.all([
    prisma.aIRun.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.aIRun.count({ where: { createdAt: { gte: dayAgo } } }),
    prisma.aIRun.count({ where: { createdAt: { gte: dayAgo }, fallback: true } }),
    prisma.aIRun.aggregate({ where: { createdAt: { gte: dayAgo } }, _avg: { duration: true } }),
    prisma.aIRun.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.aIRun.count({ where: { createdAt: { gte: weekAgo }, fallback: true } }),
  ]);

  const dayFallbackPct = dayCount ? Math.round((dayFallback / dayCount) * 100) : 0;
  const weekFallbackPct = weekCount ? Math.round((weekFallback / weekCount) * 100) : 0;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Assistant Monitor</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500">Requests (24h)</div>
          <div className="text-2xl font-semibold">{fmt(dayCount)}</div>
        </div>
        <div className="rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500">Fallback % (24h)</div>
          <div className="text-2xl font-semibold">{fmt(dayFallbackPct)}%</div>
        </div>
        <div className="rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500">Avg duration (24h)</div>
          <div className="text-2xl font-semibold">{fmt(Math.round(dayAvgDur._avg.duration ?? 0))} ms</div>
        </div>
        <div className="rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500">Fallback % (7d)</div>
          <div className="text-2xl font-semibold">{fmt(weekFallbackPct)}%</div>
        </div>
      </div>

      <div className="rounded-2xl shadow overflow-x-auto">
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
            {last50.map(r => (
              <tr key={r.id} className="border-b last:border-0">
                <td className="px-3 py-2">{new Date(r.createdAt).toLocaleString()}</td>
                <td className="px-3 py-2">{r.userId}</td>
                <td className="px-3 py-2">{r.model ?? "-"}</td>
                <td className="px-3 py-2 text-right">{fmt(r.duration)}</td>
                <td className="px-3 py-2 text-right">{fmt(r.tokensIn)}</td>
                <td className="px-3 py-2 text-right">{fmt(r.tokensOut)}</td>
                <td className="px-3 py-2 text-center">{r.fallback ? "✔" : ""}</td>
                <td className="px-3 py-2">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500">
        * Stats are computed in app layer over SQLite. For multi-instance production use Postgres + background jobs.
      </p>
    </div>
  );
}
