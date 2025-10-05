"use client";

import { useEffect, useMemo, useState } from "react";
import type { GeneratedReport, ReportPlan } from "@/types/report";
import ProgressBar from "@/components/ui/ProgressBar";

const plans: ReportPlan[] = ["core", "daily", "max"];
const cap = (s: string) => s.slice(0,1).toUpperCase() + s.slice(1);

function Sparkline({ points }: { points: Array<{ x: number; y: number }> }) {
  if (!points.length) return null;
  const w = 120, h = 36, pad = 4;
  const xs = points.map(p => p.x), ys = points.map(p => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const nx = (x: number) => pad + ((x - minX) / Math.max(1, maxX - minX)) * (w - pad * 2);
  const ny = (y: number) => h - pad - ((y - minY) / Math.max(1, maxY - minY)) * (h - pad * 2);
  const d = points.map((p, i) => `${i ? "L" : "M"} ${nx(p.x)},${ny(p.y)}`).join(" ");
  const last = points[points.length - 1]?.y ?? 0;
  const first = points[0]?.y ?? 0;
  const up = last >= first;
  return (
    <svg width={w} height={h} className="overflow-visible">
      <path d={d} fill="none" stroke={up ? "#10b981" : "#ef4444"} strokeWidth={2} />
    </svg>
  );
}

export default function ReportsAllSections() {
  const [plan, setPlan] = useState<ReportPlan>("core");
  const [data, setData] = useState<GeneratedReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({}); // секции-аккордеоны

  const fetchReport = async (p: ReportPlan) => {
    setLoading(true); setErr(null);
    try {
      const res = await fetch(`/api/reports/generate/${p}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = await res.json();
      setData(j);
      // раскрываем первые 2 секции по умолчанию
      const next: Record<string, boolean> = {};
      (j.sections ?? []).slice(0,2).forEach(s => { next[s.id] = true; });
      setOpen(next);
    } catch (e: any) {
      setErr(e?.message ?? "Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReport(plan); }, [plan]);

  const completion = useMemo(() => {
    if (!data) return 0;
    const parts = data.sections.map(s => (s.items?.length ? 50 : 0) + (s.notes?.length ? 20 : 0) + (s.charts?.length ? 30 : 0));
    const score = parts.reduce((a,b)=>a+b,0);
    const max = data.sections.length * 100;
    return max ? Math.round((score / max) * 100) : 0;
  }, [data]);

  const kpis = useMemo(() => {
    if (!data) return [];
    const flatItems = data.sections.flatMap(s => s.items ?? []);
    const age = flatItems.find(i => i.label.toLowerCase().includes("biological age"));
    const sleep = flatItems.find(i => i.label.toLowerCase().includes("sleep last night"));
    const risk = data.sections.find(s => s.title.toLowerCase().includes("risk"));
    return [
      { label: "Plan", value: cap(data.plan), hint: data.title },
      { label: "Completion", value: `${completion}%`, hint: "Sections readiness" },
      age ? { label: "Bio Age", value: String(age.value), hint: "Estimation" } : null,
      sleep ? { label: "Last Sleep", value: String(sleep.value), hint: "Last night" } : null,
      risk ? { label: "Risk block", value: "Present", hint: "Insights included" } : null,
    ].filter(Boolean) as Array<{label:string; value:string; hint?:string}>;
  }, [data, completion]);

  const trendPoints = useMemo(() => {
    const c = data?.sections.find(s => s.charts?.some(ch => ch.id.includes("hrv")));
    const arr = (c?.charts?.find(ch => ch.id.includes("hrv"))?.data as Array<{ d: string; v: number }>) ?? [];
    return arr.map((row, i) => ({ x: i, y: row.v }));
  }, [data]);

  return (
    <section className="p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-white/90 to-slate-50 text-slate-800 shadow">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{data?.title ?? "Reports"}</h2>
          <p className="text-sm text-slate-600">{data?.summary ?? "Human-readable insights with simple language."}</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Plan chips (with Capitalized labels) */}
          <div className="flex gap-2">
            {plans.map((p) => {
              const active = p === plan;
              return (
                <button
                  key={p}
                  onClick={() => setPlan(p)}
                  className={[
                    "px-4 py-1.5 rounded-full border text-sm transition",
                    active ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 hover:border-slate-400"
                  ].join(" ")}
                  aria-pressed={active}
                >
                  {cap(p)}
                </button>
              );
            })}
          </div>

          {/* Compact / Refresh / Preview */}
          <button
            onClick={() => setCompact(v => !v)}
            className="px-3 py-1.5 rounded-full border bg-white text-slate-700 hover:border-slate-400 text-sm"
            aria-pressed={compact}
            title="Toggle density"
          >
            {compact ? "Details" : "Compact"}
          </button>
          <button
            onClick={() => fetchReport(plan)}
            className="px-3 py-1.5 rounded-full border bg-white text-slate-700 hover:border-slate-400 text-sm"
            title="Reload data"
          >
            Refresh
          </button>
          <a
            href={`/member/reports/preview/${plan}`}
            className="px-3 py-1.5 rounded-full border bg-white text-slate-700 hover:border-slate-400 text-sm"
            title="Open raw preview"
          >
            Open Preview
          </a>
        </div>
      </header>

      {/* Global Progress */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">Overall readiness</span>
          <span className="text-sm text-slate-600">{completion}%</span>
        </div>
        <ProgressBar value={completion} />
      </div>

      {/* KPI Tiles */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, idx) => (
          <div key={idx} className="rounded-2xl border bg-gradient-to-b from-white to-blue-50 p-4 shadow-md">
            <div className="text-xs uppercase tracking-wide text-slate-500">{k.label}</div>
            <div className="mt-1 text-xl font-semibold">{k.value}</div>
            {k.hint && <div className="text-xs text-slate-500">{k.hint}</div>}
          </div>
        ))}
        {trendPoints.length > 1 && (
          <div className="rounded-2xl border bg-white p-4 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">HRV trend</div>
              <div className="text-xs text-slate-500">last 4 days</div>
            </div>
            <Sparkline points={trendPoints} />
          </div>
        )}
      </div>

      {/* Sections */}
      <div className={["mt-6 grid gap-4", compact ? "md:grid-cols-3" : "md:grid-cols-2"].join(" ")}>
        {loading && <div className="text-sm text-slate-500">Loading…</div>}
        {err && <div className="text-sm text-red-600">Error: {err}</div>}
        {data?.sections.map((s) => {
          const items = s.items?.length ?? 0;
          const notes = s.notes?.length ?? 0;
          const charts = s.charts?.length ?? 0;
          const secScore = ((items ? 50 : 0) + (notes ? 20 : 0) + (charts ? 30 : 0));
          const opened = !!open[s.id];

          return (
            <article key={s.id} className="rounded-2xl border bg-gradient-to-b from-white to-slate-50 p-5 shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    {/* badges */}
                    {items > 0 && <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 border">items: {items}</span>}
                    {notes > 0 && <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 border">notes: {notes}</span>}
                    {charts > 0 && <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 border">charts: {charts}</span>}
                  </div>
                  {s.description && <p className="text-sm text-slate-600 mt-1">{s.description}</p>}
                </div>

                <div className="min-w-[140px] text-right">
                  <div className="text-[11px] text-slate-500 mb-1">Section</div>
                  <ProgressBar value={secScore} />
                  <button
                    onClick={() => setOpen(st => ({ ...st, [s.id]: !st[s.id] }))}
                    className="mt-2 text-xs text-slate-700 underline underline-offset-2"
                    aria-expanded={opened}
                  >
                    {opened ? "Collapse" : "Expand"}
                  </button>
                </div>
              </div>

              {opened && items > 0 && (
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {s.items!.map((it, i) => (
                    <li key={i} className="rounded-xl border bg-slate-50 px-3 py-2">
                      <div className="text-xs text-slate-500">{it.label}</div>
                      <div className="text-sm font-medium">
                        {String(it.value)}
                        {it.hint && <span className="ml-1 text-slate-500">· {it.hint}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {opened && notes > 0 && (
                <div className="mt-3 text-xs text-slate-600">
                  <span className="font-medium">Notes:</span> {s.notes!.join(" ")}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
