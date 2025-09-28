/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
export const runtime = "nodejs";

function seriesDaily() {
  const out: unknown[] = [];
  const today = new Date();
  for (let i=13;i>=0;i--) {
    const d = new Date(today); d.setDate(today.getDate()-i);
    out.push({ d: d.toISOString().slice(5,10), revenue: Math.round(6000 + Math.random()*7000) });
  }
  return out;
}
function seriesMonthly() {
  const out: unknown[] = [];
  const now = new Date();
  for (let i=11;i>=0;i--) {
    const dt = new Date(now.getFullYear(), now.getMonth()-i, 1);
    out.push({ m: dt.toLocaleString("en", { month:"short" }), revenue: Math.round(150000 + Math.random()*90000) });
  }
  return out;
}
function seriesYearly() {
  const out: unknown[] = [];
  const y = new Date().getFullYear();
  for (let i=4;i>=0;i--) {
    const yy = y - i;
    out.push({ y: String(yy), revenue: Math.round(1_600_000 + Math.random()*800_000) });
  }
  return out;
}

export async function GET() {
  const returns = [
    { reason: "Duplicate purchase", amount: 1250 },
    { reason: "Card dispute", amount: 2310 },
    { reason: "Customer request", amount: 980 },
    { reason: "Fraud suspicion", amount: 450 },
  ];
  return NextResponse.json({
    daily: seriesDaily(),
    monthly: seriesMonthly(),
    yearly: seriesYearly(),
    returns
  });
}
