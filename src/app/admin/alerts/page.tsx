"use client";
import { useEffect, useMemo, useState } from "react";

type Alert = {
  id: string;
  level: "critical" | "warning" | "info";
  source: string;
  msg: string;
  ts: number;
};

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [lvl, setLvl] = useState<"all" | "critical" | "warning" | "info">(
    "all",
  );
  const [src, setSrc] = useState("all");

  const load = () =>
    fetch("/api/alerts/list")
      .then((r) => r.json())
      .then((d) => setAlerts(d.alerts));
  useEffect(() => {
    load();
    const id = setInterval(load, 10000);
    return () => clearInterval(id);
  }, []);

  const sources = useMemo(
    () => Array.from(new Set(alerts.map((a) => a.source))),
    [alerts],
  );
  const filtered = useMemo(
    () =>
      alerts.filter((a) => {
        const okL = lvl === "all" ? true : a.level === lvl;
        const okS = src === "all" ? true : a.source === src;
        return okL && okS;
      }),
    [alerts, lvl, src],
  );

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Alerts & Incidents</h2>
      <div className="flex gap-2 flex-wrap">
        <select
          value={lvl}
          onChange={(e) => setLvl(e.target.value as any)}
          className="px-2 py-1 rounded bg-slate-900/60 border border-slate-700"
        >
          <option value="all">All levels</option>
          <option value="critical">Critical</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
        <select
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          className="px-2 py-1 rounded bg-slate-900/60 border border-slate-700"
        >
          <option value="all">All sources</option>
          {sources.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          onClick={load}
          className="btn-nasa"
        >
          Refresh
        </button>
      </div>

      <div className="bg-[#0c1324] border border-slate-800 rounded-xl p-4 space-y-2">
        {filtered.map((a) => (
          <div
            key={a.id}
            className="flex items-start gap-3 border-t border-slate-800 pt-2 first:border-t-0"
          >
            <span
              className={`mt-0.5 px-2 py-0.5 rounded text-xs ${
                a.level === "critical"
                  ? "bg-rose-400/20 text-rose-300"
                  : a.level === "warning"
                    ? "bg-amber-400/20 text-amber-300"
                    : "bg-sky-400/20 text-sky-300"
              }`}
            >
              {a.level.toUpperCase()}
            </span>
            <div className="flex-1">
              <div className="text-sm">
                <span className="text-slate-300">{a.source}</span> — {a.msg}
              </div>
              <div className="text-xs text-slate-500">
                {new Date(a.ts).toLocaleString()}
              </div>
            </div>
            <button className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs">
              Acknowledge
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
