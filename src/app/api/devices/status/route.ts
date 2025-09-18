/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET() {
  const items = ["API Gateway","Auth Service","Payments","Devices Stream","Analytics","Scheduler","Mail"];
  const svc = items.map((name,i)=>({
    id: "S"+i,
    name,
    status: Math.random()>0.92?"DOWN":(Math.random()>0.85?"DEGRADED":"UP"),
    latencyMs: Math.round(60 + Math.random()*240)
  }));
  return NextResponse.json({ services: svc });
}
