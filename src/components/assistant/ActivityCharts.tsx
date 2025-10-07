"use client";
import React from "react";

type HourPoint = {
  hour: string;
  total: number;
  ok: number;
  fallback: number;
  error: number;
  rateLimit: number;
  avgMs: number;
};
type DayPoint = {
  day: string;
  total: number;
  ok: number;
  fallback: number;
  error: number;
  rateLimit: number;
};
type Stats = {
  last24: HourPoint[];
  last7: DayPoint[];
  metrics: { total: number; fallbackPct: number; avgMs: number };
};

function useStats(userId: string) {
  const [data, setData] = React.useState<Stats | null>(null);
  const [err, setErr] = React.useState<string | null>(null);
  const load = React.useCallback(
    async (signal?: AbortSignal) => {
      try {
        const res = await fetch(
          `/api/assistant/activity/stats?userId=${encodeURIComponent(userId)}`,
          { cache: "no-store", signal },
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setData(await res.json());
        setErr(null);
      } catch (e: any) {
        if (e?.name !== "AbortError") setErr(e?.message || "Failed to load");
      }
    },
    [userId],
  );

  React.useEffect(() => {
    const c = new AbortController();
    load(c.signal);
    const t = setInterval(() => load(c.signal), 10000);
    return () => {
      c.abort();
      clearInterval(t);
    };
  }, [load]);
  return { data, err };
}

function Bar({
  x,
  y,
  w,
  h,
  cls,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  cls: string;
}) {
  return <rect x={x} y={y} width={w} height={h} className={cls} rx="3" />;
}

export default function ActivityCharts({
  userId = "U1001",
}: {
  userId?: string;
}) {
  const { data, err } = useStats(userId);
  const frame = "stroke-slate-800/60";

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-slate-800/60 bg-slate-800/40 backdrop-blur-sm">
        <div className="px-4 py-3 border-b border-slate-800/60 text-sm font-semibold text-slate-200">
          Activity — last 24h
        </div>
        <div className="p-4">
          {err && <div className="text-sm text-rose-300">{err}</div>}
          {!err && !data && (
            <div className="text-sm text-slate-400">Loading…</div>
          )}
          {data && (
            <>
              <Legend />
              <Histogram24 points={data.last24} frame={frame} />
              <div className="mt-2 text-xs text-slate-400">
                avg duration:{" "}
                <span className="text-slate-200">{data.metrics.avgMs} ms</span>{" "}
                · fallback:
                <span className="text-slate-200">
                  {" "}
                  {data.metrics.fallbackPct}%
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800/60 bg-slate-800/40 backdrop-blur-sm">
        <div className="px-4 py-3 border-b border-slate-800/60 text-sm font-semibold text-slate-200">
          Activity — last 7d
        </div>
        <div className="p-4">
          {err && <div className="text-sm text-rose-300">{err}</div>}
          {!err && !data && (
            <div className="text-sm text-slate-400">Loading…</div>
          )}
          {data && (
            <>
              <Legend />
              <Stacked7d points={data.last7} frame={frame} />
              <div className="mt-2 text-xs text-slate-400">
                total:{" "}
                <span className="text-slate-200">{data.metrics.total}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Legend() {
  const pill = "inline-block w-2.5 h-2.5 rounded-full";
  return (
    <div className="flex items-center gap-4 text-xs text-slate-300 mb-2">
      <span className="flex items-center gap-2">
        <i className={`${pill} bg-emerald-500`} /> ok
      </span>
      <span className="flex items-center gap-2">
        <i className={`${pill} bg-amber-400`} /> fallback
      </span>
      <span className="flex items-center gap-2">
        <i className={`${pill} bg-orange-500`} /> rate-limit
      </span>
      <span className="flex items-center gap-2">
        <i className={`${pill} bg-rose-500`} /> error
      </span>
    </div>
  );
}

function Histogram24({
  points,
  frame,
}: {
  points: HourPoint[];
  frame: string;
}) {
  const W = 560,
    H = 140,
    pad = 20;
  const max = Math.max(1, ...points.map((p) => p.total));
  const bw = Math.max(
    3,
    Math.floor((W - pad * 2) / Math.max(1, points.length)) - 2,
  );
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[160px]">
      <rect
        x="0"
        y="0"
        width={W}
        height={H}
        className={`fill-slate-900/0 ${frame}`}
        rx="12"
      />
      {points.map((p, i) => {
        const x = pad + i * (bw + 2);
        const okH = Math.round((p.ok / max) * (H - pad * 2));
        const fbH = Math.round((p.fallback / max) * (H - pad * 2));
        const rlH = Math.round((p.rateLimit / max) * (H - pad * 2));
        const erH = Math.round((p.error / max) * (H - pad * 2));
        let y = H - pad;
        return (
          <g key={i}>
            {erH > 0 &&
              ((y -= erH),
              (<Bar x={x} y={y} w={bw} h={erH} cls="fill-rose-500" />))}
            {rlH > 0 &&
              ((y -= rlH),
              (<Bar x={x} y={y} w={bw} h={rlH} cls="fill-orange-500" />))}
            {fbH > 0 &&
              ((y -= fbH),
              (<Bar x={x} y={y} w={bw} h={fbH} cls="fill-amber-400" />))}
            {okH > 0 &&
              ((y -= okH),
              (<Bar x={x} y={y} w={bw} h={okH} cls="fill-emerald-500" />))}
          </g>
        );
      })}
      <text x={pad} y={H - 4} className="fill-slate-500 text-[10px]">
        now-24h → now
      </text>
    </svg>
  );
}

function Stacked7d({ points, frame }: { points: DayPoint[]; frame: string }) {
  const W = 560,
    H = 140,
    pad = 20,
    gap = 10;
  const max = Math.max(1, ...points.map((p) => p.total));
  const bw = Math.max(
    14,
    Math.floor(
      (W - pad * 2 - gap * Math.max(points.length - 1, 0)) /
        Math.max(1, points.length),
    ),
  );
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[160px]">
      <rect
        x="0"
        y="0"
        width={W}
        height={H}
        className={`fill-slate-900/0 ${frame}`}
        rx="12"
      />
      {points.map((p, i) => {
        const x = pad + i * (bw + gap);
        const okH = Math.round((p.ok / max) * (H - pad * 2));
        const fbH = Math.round((p.fallback / max) * (H - pad * 2));
        const rlH = Math.round((p.rateLimit / max) * (H - pad * 2));
        const erH = Math.round((p.error / max) * (H - pad * 2));
        let y = H - pad;
        return (
          <g key={i}>
            {erH > 0 &&
              ((y -= erH),
              (<Bar x={x} y={y} w={bw} h={erH} cls="fill-rose-500" />))}
            {rlH > 0 &&
              ((y -= rlH),
              (<Bar x={x} y={y} w={bw} h={rlH} cls="fill-orange-500" />))}
            {fbH > 0 &&
              ((y -= fbH),
              (<Bar x={x} y={y} w={bw} h={fbH} cls="fill-amber-400" />))}
            {okH > 0 &&
              ((y -= okH),
              (<Bar x={x} y={y} w={bw} h={okH} cls="fill-emerald-500" />))}
            <text
              x={x + bw / 2}
              y={H - 6}
              textAnchor="middle"
              className="fill-slate-500 text-[9px]"
            >
              {p.day.slice(5)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
