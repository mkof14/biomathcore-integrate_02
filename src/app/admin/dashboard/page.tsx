"use client";
import { useEffect, useMemo, useState } from "react";
import StatCard from "@/components/admin/ui/StatCard";
import Sparkline from "@/components/admin/ui/Sparkline";

export default function Dashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [kpis, setKpis] = useState<any>(null);

  useEffect(() => {
    fetch("/api/analytics/summary")
      .then((r) => r.json())
      .then(setSummary);
    fetch("/api/analytics/kpis")
      .then((r) => r.json())
      .then(setKpis);
  }, []);

  const top = useMemo(() => {
    if (!summary) return [];
    return [
      {
        title: "Revenue (MTD)",
        value: `$${summary.kpi.revenueMTD.toLocaleString()}`,
        sub: "+12% MoM",
      },
      {
        title: "Active Users",
        value: summary.kpi.usersActive.toLocaleString(),
        sub: "+3.2% WoW",
      },
      {
        title: "Devices Online",
        value: summary.kpi.devicesOnline.toLocaleString(),
        sub: `Incidents today: ${summary.kpi.incidentsToday}`,
      },
    ];
  }, [summary]);

  const fmtMoney = (n: number) =>
    n >= 1000 ? `$${n.toLocaleString()}` : `$${n}`;

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-4">
        {top.map((k: any, i: number) => (
          <StatCard key={i} {...k} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#0c1324] border border-slate-800 rounded-xl p-5">
          <div className="mb-3 text-sm text-slate-300">
            Users — Arrivals / Departures
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-xl p-4 bg-sky-400/10 border border-sky-700/30">
              <div className="text-xs text-slate-400 mb-1">Today</div>
              <div className="text-2xl font-semibold text-sky-300">
                {kpis?.users.today.in ?? "—"}
              </div>
              <div className="text-sm text-rose-300 mt-1">
                −{kpis?.users.today.out ?? "—"}
              </div>
            </div>
            <div className="rounded-xl p-4 bg-emerald-400/10 border border-emerald-700/30">
              <div className="text-xs text-slate-400 mb-1">This Month</div>
              <div className="text-2xl font-semibold text-emerald-300">
                {kpis?.users.month.in ?? "—"}
              </div>
              <div className="text-sm text-rose-300 mt-1">
                −{kpis?.users.month.out ?? "—"}
              </div>
            </div>
            <div className="rounded-xl p-4 bg-amber-400/10 border border-amber-700/30">
              <div className="text-xs text-slate-400 mb-1">This Year</div>
              <div className="text-2xl font-semibold text-amber-300">
                {kpis?.users.year.in ?? "—"}
              </div>
              <div className="text-sm text-rose-300 mt-1">
                −{kpis?.users.year.out ?? "—"}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0c1324] border border-slate-800 rounded-xl p-5">
          <div className="mb-3 text-sm text-slate-300">
            Revenue — Day / Month / Year
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-xl p-4 bg-emerald-400/10 border border-emerald-700/30">
              <div className="text-xs text-slate-400 mb-1">Today</div>
              <div className="text-2xl font-semibold text-emerald-300">
                {kpis ? fmtMoney(kpis.revenue.day) : "—"}
              </div>
            </div>
            <div className="rounded-xl p-4 bg-sky-400/10 border border-sky-700/30">
              <div className="text-xs text-slate-400 mb-1">This Month</div>
              <div className="text-2xl font-semibold text-sky-300">
                {kpis ? fmtMoney(kpis.revenue.month) : "—"}
              </div>
            </div>
            <div className="rounded-xl p-4 bg-purple-400/10 border border-purple-700/30">
              <div className="text-xs text-slate-400 mb-1">This Year</div>
              <div className="text-2xl font-semibold text-purple-300">
                {kpis ? fmtMoney(kpis.revenue.year) : "—"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#0c1324] border border-slate-800 rounded-xl p-4">
          <div className="mb-2 text-sm text-slate-300">Revenue Trend</div>
          {summary && <Sparkline data={summary.revenueTrend} />}
        </div>
        <div className="bg-[#0c1324] border border-slate-800 rounded-xl p-4">
          <div className="mb-2 text-sm text-slate-300">Churn %</div>
          {summary && <Sparkline data={summary.churnTrend} />}
        </div>
      </div>
    </div>
  );
}
