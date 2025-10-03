"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type HourPoint = { hour:string; total:number; ok:number; fallback:number; error:number; rateLimit:number; avgMs:number; };
type DayPoint  = { day:string;  total:number; ok:number; fallback:number; error:number; rateLimit:number; };
type StatsResp = { last24: HourPoint[]; last7: DayPoint[]; metrics: { total:number; fallbackPct:number; avgMs:number } };
type ActivityItem = { id:string; status:string; createdAt:string; duration?:number|null; tokensIn?:number|null; tokensOut?:number|null; };

export default function DashboardAddons({ userId="U1001" }: { userId?: string }) {
  const [stats, setStats] = useState<StatsResp|null>(null);
  const [items, setItems]  = useState<ActivityItem[]|null>(null);
  const [err, setErr] = useState<string|null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [s, a] = await Promise.all([
          fetch(`/api/assistant/activity/stats?userId=${userId}`, { cache: "no-store" }).then(r=>r.json()),
          fetch(`/api/assistant/activity?userId=${userId}`,       { cache: "no-store" }).then(r=>r.json())
        ]);
        if (!alive) return;
        setStats(s);
        setItems(a.items ?? []);
      } catch (e:any) {
        if (!alive) return;
        setErr(e?.message ?? "Failed to load dashboard widgets");
      }
    })();
    return () => { alive = false; };
  }, [userId]);

  const donut = useMemo(() => {
    const t = stats?.last7?.reduce((acc, d) => {
      acc.ok += d.ok; acc.fb += d.fallback; acc.rl += d.rateLimit; acc.er += d.error; acc.total += d.total;
      return acc;
    }, { ok:0, fb:0, rl:0, er:0, total:0 }) ?? { ok:0, fb:0, rl:0, er:0, total:0 };
    return t;
  }, [stats]);

  const spark = useMemo(() => {
    const arr = stats?.last24 ?? [];
    return arr.map(p => p.avgMs);
  }, [stats]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* KPI */}
      <Kpis
        total={stats?.metrics.total ?? 0}
        avgMs={stats?.metrics.avgMs ?? 0}
        fallbackPct={stats?.metrics.fallbackPct ?? 0}
      />

      {/* мини-тренд latency за 24ч */}
      <Card title="Latency (24h)" subtitle="avg ms per hour">
        <Sparkline values={spark} height={64} />
      </Card>

      {/* распределение статусов за 7д */}
      <Card title="Statuses (7d)" subtitle="share of requests">
        <Donut ok={donut.ok} fb={donut.fb} rl={donut.rl} er={donut.er} />
      </Card>

      {/* уведомления (последние прогоны) */}
      <Card className="xl:col-span-2" title="Recent Activity" subtitle="latest 10 runs">
        {err && <div className="text-sm text-rose-300">{err}</div>}
        {!items && !err && <div className="text-sm text-slate-400">Loading…</div>}
        {items && items.length === 0 && <div className="text-sm text-slate-400">No records yet.</div>}
        {items && items.length > 0 && (
          <ul className="divide-y divide-slate-800/70">
            {items.map(it => (
              <li key={it.id} className="py-2 flex items-center gap-3 text-sm">
                <span className={dotCls(it.status)} title={it.status} />
                <span className="capitalize">{it.status}</span>
                <span className="text-slate-500">· {new Date(it.createdAt).toLocaleString()}</span>
                {typeof it.duration === "number" && <span className="ml-auto text-slate-400">{it.duration} ms</span>}
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* быстрые действия */}
      <Card title="Quick Actions" subtitle="jump right in">
        <div className="flex flex-wrap gap-2">
          <QLink href="/member/health-assistant"  className="bg-sky-600/80 hover:bg-sky-600">Ask Assistant</QLink>
          <QLink href="/member/health-blackbox"   className="bg-emerald-600/80 hover:bg-emerald-600">Upload File</QLink>
          <QLink href="/member/questionnaires"    className="bg-amber-600/80 hover:bg-amber-600">Questionnaires</QLink>
          <QLink href="/member/reports"           className="bg-indigo-600/80 hover:bg-indigo-600">Reports</QLink>
        </div>
      </Card>
    </div>
  );
}

/* ——— UI helpers ——— */

function Card({ title, subtitle, children, className="" }:{
  title: string; subtitle?: string; children: any; className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-slate-800 bg-slate-900/50 p-4 ${className}`}>
      <div className="mb-2">
        <div className="text-sm font-semibold text-slate-200">{title}</div>
        {subtitle && <div className="text-xs text-slate-500">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

function Kpis({ total, avgMs, fallbackPct }:{ total:number; avgMs:number; fallbackPct:number; }) {
  const items = [
    { label: "Total req", value: total.toLocaleString() },
    { label: "Avg latency", value: `${avgMs} ms` },
    { label: "Fallback rate", value: `${fallbackPct}%` },
  ];
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
      <div className="text-sm font-semibold text-slate-200 mb-3">KPI (last 7d)</div>
      <div className="grid grid-cols-3 gap-3">
        {items.map((k, i) => (
          <div key={i} className="rounded-xl bg-slate-900/60 border border-slate-800 p-3">
            <div className="text-xs text-slate-400">{k.label}</div>
            <div className="text-lg font-semibold text-slate-100">{k.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sparkline({ values, height=64 }:{ values:number[]; height?:number }) {
  if (!values || values.length === 0) return <div className="text-sm text-slate-400">No data</div>;
  const W = 260, H = height, pad = 6;
  const min = Math.min(...values), max = Math.max(...values);
  const xs = values.map((_,i) => pad + i*( (W-2*pad) / Math.max(1,values.length-1) ));
  const ys = values.map(v => {
    if (max===min) return H/2;
    return pad + (H-2*pad) - ( (v-min) / (max-min) ) * (H-2*pad);
  });
  const d = xs.map((x,i)=>`${i===0?'M':'L'}${x.toFixed(1)},${( (ys[i] ?? 0) ).toFixed(1)}`).join(" ");
  const area = `M${pad},${H-pad} ` + xs.map((x,i)=>`L${x.toFixed(1)},${( (ys[i] ?? 0) ).toFixed(1)}`).join(" ") + ` L${W-pad},${H-pad} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[${H}px]">
      <path d={area} className="fill-sky-500/15" />
      <path d={d} className="stroke-sky-400" strokeWidth="2" fill="none" />
    </svg>
  );
}

function Donut({ ok, fb, rl, er }:{ ok:number; fb:number; rl:number; er:number; }) {
  const total = Math.max(1, ok+fb+rl+er);
  const segs = [
    { v: ok, cls: "text-emerald-500" , label: "ok" },
    { v: fb, cls: "text-amber-400"   , label: "fallback" },
    { v: rl, cls: "text-orange-500"  , label: "rate-limit" },
    { v: er, cls: "text-rose-500"    , label: "error" },
  ];
  const R = 38, C = 2*Math.PI*R;
  let off = 0;
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 100 100" className="w-24 h-24">
        <circle cx="50" cy="50" r={R} className="stroke-slate-800" strokeWidth="16" fill="none" />
        {segs.map((s, i) => {
          const len = (s.v/total) * C;
          const el = (
            <circle
              key={i}
              cx="50" cy="50" r={R}
              className={`stroke-current ${s.cls}`}
              strokeWidth="16" fill="none"
              strokeDasharray={`${len} ${C-len}`}
              strokeDashoffset={-off}
              transform="rotate(-90 50 50)"
            />
          );
          off += len;
          return el;
        })}
      </svg>
      <div className="text-xs space-y-1">
        {segs.map((s,i)=>(
          <div key={i} className="flex items-center gap-2">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${s.cls.replace('text-','bg-')}`} />
            <span className="text-slate-300">{s.label}</span>
            <span className="text-slate-500">· {s.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function QLink({ href, className, children }:{ href:string; className?:string; children:any }) {
  return (
    <Link href={href} className={`text-xs px-2 py-1 rounded-md text-white ${className}`}>{children}</Link>
  );
}

function dotCls(status:string) {
  const base = "inline-block w-2.5 h-2.5 rounded-full";
  if (status === "ok") return `${base} bg-emerald-500`;
  if (status === "fallback") return `${base} bg-amber-400`;
  if (status === "rate-limit") return `${base} bg-orange-500`;
  return `${base} bg-rose-500`;
}
