export const dynamic = "force-dynamic";
import DashboardAddons from "@/components/dashboard/DashboardAddons";

import Link from "next/link";
import AssistantTimelineMount from "@/components/assistant/AssistantTimelineMount";
import ActivityCharts from "@/components/assistant/ActivityCharts";

type FileItem = {
  id: string;
  name?: string;
  title?: string;
  createdAt?: string;
};
type ReportItem = { id: string; title?: string; createdAt?: string };

async function getJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      cache: "no-store",
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function RecentFiles({ userId }: { userId: string }) {
  const data = await getJSON<{ items: FileItem[] }>(
    `/api/hbx/files?userId=${encodeURIComponent(userId)}`,
  );
  const items = data?.items ?? [];
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50">
      <div className="px-4 py-3 border-b border-slate-800 text-sm font-semibold text-slate-200">
        Recent Files
      </div>
      {items.length === 0 ? (
        <div className="px-4 py-3 text-sm text-slate-400">No files yet.</div>
      ) : (
        <ul className="divide-y divide-slate-800">
          {items.slice(0, 8).map((f) => (
            <li
              key={f.id}
              className="px-4 py-3 text-sm flex items-center justify-between"
            >
              <span className="text-slate-200">
                {f.name ?? f.title ?? f.id}
              </span>
              {f.createdAt && (
                <span className="text-xs text-slate-500">
                  {new Date(f.createdAt).toLocaleString()}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="px-4 py-3">
        <Link
          href="/member/health-blackbox"
          className="btn-nasa"
        >
          Upload File
        </Link>
      </div>
    </div>
  );
}

async function Reports({ userId }: { userId: string }) {
  const data = await getJSON<{ items: ReportItem[] }>(
    `/api/reports/list?userId=${encodeURIComponent(userId)}`,
  );
  const items = data?.items ?? [];
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50">
      <div className="px-4 py-3 border-b border-slate-800 text-sm font-semibold text-slate-200">
        Reports
      </div>
      {items.length === 0 ? (
        <div className="px-4 py-3 text-sm text-slate-400">No reports yet.</div>
      ) : (
        <ul className="divide-y divide-slate-800">
          {items.slice(0, 8).map((r) => (
            <li
              key={r.id}
              className="px-4 py-3 text-sm flex items-center justify-between"
            >
              <span className="text-slate-200">{r.title ?? r.id}</span>
              {r.createdAt && (
                <span className="text-xs text-slate-500">
                  {new Date(r.createdAt).toLocaleString()}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="px-4 py-3">
        <Link
          href="/member/reports"
          className="btn-nasa"
        >
          Open Reports
        </Link>
      </div>
    </div>
  );
}

export default async function Dashboard() {
  const userId = "U1001";
  return (
    <main
      className="min-h-screen bg-slate-950 text-slate-200"
      style={{
        backgroundColor: "#0b1220",
      }} /* fallback, если что-то перебивает классы */
    >
      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Link
              href="/member/health-assistant"
              className="btn-nasa"
            >
              Ask Assistant
            </Link>
            <Link
              href="/member/health-blackbox"
              className="btn-nasa"
            >
              Upload File
            </Link>
            <Link
              href="/member/questionnaires"
              className="btn-nasa"
            >
              Questionnaires
            </Link>
          </div>
        </div>

        {/* Charts */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 mb-6">
          <div className="text-sm font-semibold text-slate-200 mb-2">
            Assistant Metrics
          </div>
          <ActivityCharts userId={userId} />

          {/* Dashboard extra widgets */}
          <div className="mt-6">
            <DashboardAddons userId={userId} />
          </div>
        </div>

        {/* 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Timeline */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50">
            <div className="px-4 py-3 border-b border-slate-800 text-sm font-semibold text-slate-200">
              Assistant Activity
            </div>
            <div className="p-4">
              {/* модель намеренно не показываем */}
              <AssistantTimelineMount userId={userId} />
            </div>
          </div>

          {/* Files + Reports */}
          <div className="flex flex-col gap-6">
            {/* @ts-expect-error Async Server Component */}
            <RecentFiles userId={userId} />
            {/* @ts-expect-error Async Server Component */}
            <Reports userId={userId} />
          </div>
        </div>
      </div>
    </main>
  );
}
