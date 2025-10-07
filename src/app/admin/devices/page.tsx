"use client";
import { useEffect, useMemo, useState } from "react";
type Svc = {
  id: string;
  name: string;
  status: "UP" | "DOWN" | "DEGRADED";
  latencyMs: number;
};

export default function Devices() {
  const [items, setItems] = useState<Svc[]>([]);
  const [status, setStatus] = useState<"ALL" | "UP" | "DEGRADED" | "DOWN">(
    "ALL",
  );
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string>("");

  const load = async () => {
    try {
      setErr("");
      const r = await fetch("/api/devices/status", { cache: "no-store" });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const d = await r.json();
      setItems(d.services || []);
    } catch (e: any) {
      setErr("Failed to load device status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, []);
  const filtered = useMemo(
    () => items.filter((s) => (status === "ALL" ? true : s.status === status)),
    [items, status],
  );

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Device Monitor</h2>
      <div className="flex gap-2">
        {(["ALL", "UP", "DEGRADED", "DOWN"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-3 py-1 rounded ${status === s ? "bg-sky-500 text-slate-900" : "bg-slate-800"}`}
          >
            {s}
          </button>
        ))}
        <button
          onClick={load}
          className="ml-auto px-3 py-1 rounded bg-slate-800"
        >
          Refresh
        </button>
      </div>
      {loading && <div className="text-slate-400 text-sm">Loading…</div>}
      {err && <div className="text-rose-400 text-sm">{err}</div>}
      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-[#0c1324] border border-slate-800 rounded-xl p-4"
          >
            <div className="flex justify-between">
              <div className="font-semibold">{s.name}</div>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  s.status === "UP"
                    ? "bg-emerald-400/20 text-emerald-300"
                    : s.status === "DEGRADED"
                      ? "bg-amber-400/20 text-amber-300"
                      : "bg-rose-400/20 text-rose-300"
                }`}
              >
                {s.status}
              </span>
            </div>
            <div className="mt-2 text-sm text-slate-400">
              Latency: {s.latencyMs} ms
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
