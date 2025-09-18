import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET() {
  return NextResponse.json({
    kpi: { revenueMTD: 48230, usersActive: 8412, devicesOnline: 127, incidentsToday: 3 },
    revenueTrend: Array.from({length: 12}).map((_,i)=>({ x: i+1, y: Math.round(2000+Math.random()*1500) })),
    churnTrend: Array.from({length: 12}).map((_,i)=>({ x: i+1, y: +(2+Math.random()*2).toFixed(2) })),
    exits: [{path:"/pricing", pct:18}, {path:"/checkout", pct:11}, {path:"/questionnaires", pct:9}],
    churnPrediction: [{segment:"trial", risk:0.31}, {segment:"basic", risk:0.18}, {segment:"pro", risk:0.07}]
  });
}
