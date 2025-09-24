import { NextResponse } from "next/server";
import { getPrisma } from "@/server/util/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toUTC(ts: Date) { return new Date(ts.toISOString()); }

export async function GET(req: Request) {
  const prisma = getPrisma();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "U1001";

  const since = new Date(Date.now() - 7 * 24 * 3600 * 1000);
  const rows = await prisma.aIRun.findMany({
    where: { userId, createdAt: { gte: since } },
    orderBy: { createdAt: "asc" },
    select: { status: true, duration: true, createdAt: true },
  });

  // 24h hourly
  const now = new Date();
  const from24 = new Date(now.getTime() - 24 * 3600 * 1000);
  const hourBuckets: Record<string, { total: number; ok: number; fallback: number; error: number; rateLimit: number; sumMs: number; avgMs: number; }> = {};
  for (let i = 0; i < 24; i++) {
    const d = new Date(from24.getTime() + i * 3600 * 1000);
    const key = d.toISOString().slice(0, 13) + ":00";
    hourBuckets[key] = { total: 0, ok: 0, fallback: 0, error: 0, rateLimit: 0, sumMs: 0, avgMs: 0 };
  }
  rows.forEach(r => {
    if (r.createdAt >= from24) {
      const k = toUTC(r.createdAt).toISOString().slice(0,13)+":00";
      const b = hourBuckets[k]; if (!b) return;
      b.total++;
      if (r.status === "ok") b.ok++;
      else if (r.status === "fallback") b.fallback++;
      else if (r.status === "rate-limit") b.rateLimit++;
      else b.error++;
      if (typeof r.duration === "number") b.sumMs += r.duration;
    }
  });
  Object.values(hourBuckets).forEach(b => { b.avgMs = b.total ? Math.round(b.sumMs / b.total) : 0; });
  const last24 = Object.entries(hourBuckets).map(([k,b]) => ({ hour: k, total: b.total, ok: b.ok, fallback: b.fallback, error: b.error, rateLimit: b.rateLimit, avgMs: b.avgMs }));

  // 7d daily
  const dayBuckets: Record<string, { total: number; ok: number; fallback: number; error: number; rateLimit: number; }> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 3600 * 1000);
    const key = d.toISOString().slice(0,10);
    dayBuckets[key] = { total: 0, ok: 0, fallback: 0, error: 0, rateLimit: 0 };
  }
  rows.forEach(r => {
    const k = toUTC(r.createdAt).toISOString().slice(0,10);
    const b = dayBuckets[k]; if (!b) return;
    b.total++;
    if (r.status === "ok") b.ok++;
    else if (r.status === "fallback") b.fallback++;
    else if (r.status === "rate-limit") b.rateLimit++;
    else b.error++;
  });
  const last7 = Object.entries(dayBuckets).map(([k,b]) => ({ day: k, total: b.total, ok: b.ok, fallback: b.fallback, error: b.error, rateLimit: b.rateLimit }));

  const totals = rows.length;
  const fallbackPct = totals ? Math.round(1000 * rows.filter(r=>r.status==="fallback").length / totals)/10 : 0;
  const avgMs = rows.length ? Math.round(rows.reduce((s:any,r:any)=>s+(r.duration??0),0) / rows.length) : 0;

  return NextResponse.json({ last24, last7, metrics: { total: totals, fallbackPct, avgMs } });
}
