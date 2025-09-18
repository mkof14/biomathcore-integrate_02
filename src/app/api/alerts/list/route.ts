import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET() {
  return NextResponse.json({
    alerts: [
      { id:"A1", level:"critical", source:"payments", msg:"Latency spike p95>500ms", ts: Date.now()-120000 },
      { id:"A2", level:"warning", source:"devices", msg:"5 devices offline", ts: Date.now()-420000 },
      { id:"A3", level:"info", source:"auth", msg:"Login rate +20%", ts: Date.now()-720000 }
    ]
  });
}
