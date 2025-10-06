"use client";
import { useEffect, useState } from "react";

export default function Behavior() {
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/analytics/summary", { cache: "no-store" });
        if (!r.ok) throw new Error("HTTP " + r.status);
        setData(await r.json());
      } catch (e: any) {
        setErr("Failed to load analytics");
      }
    })();
  }, []);

  const cells = Array.from({ length: 24 * 7 }).map((_, i) => i);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Behavior Analytics</h2>
      {err && <div className="text-rose-400 text-sm">{err}</div>}
      <div className="bg-[#0c1324] border border-slate-800 rounded-xl p-4">
        <div className="mb-2 text-sm text-slate-300">
          Activity Heatmap (7 days × 24h)
        </div>
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: "repeat(24,minmax(0,1fr))" }}
        >
          {cells.map((i) => {
            const v = i % 13 === 0 ? 0.2 : i % 7 === 0 ? 0.5 : 0.8;
            return (
              <div
                key={i}
                className="h-3"
                style={{ background: `rgba(56,189,248,${v})` }}
              />
            );
          })}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-[#0c1324] border border-slate-800 rounded-xl p-4">
          <div className="mb-2 text-sm text-slate-300">Exit Points</div>
          <ul className="text-sm space-y-1">
            {(data?.exits || []).map((e: any, i: number) => (
              <li key={i} className="flex justify-between">
                <span>{e.path}</span>
                <span>{e.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#0c1324] border border-slate-800 rounded-xl p-4">
          <div className="mb-2 text-sm text-slate-300">AI Churn Prediction</div>
          <ul className="text-sm space-y-1">
            {(data?.churnPrediction || []).map((e: any, i: number) => (
              <li key={i} className="flex justify-between">
                <span>{e.segment}</span>
                <span>{Math.round(e.risk * 100)}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
