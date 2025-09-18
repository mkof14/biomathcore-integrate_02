import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET() {
  const now = Date.now();
  const start = new Date(); start.setDate(1);
  const end = new Date(start); end.setMonth(end.getMonth()+1); end.setDate(0);
  return NextResponse.json({
    summary: {
      plan: "Pro",
      status: "active",
      currentPeriod: { start: start.toISOString(), end: end.toISOString() },
      totals: {
        day: 1299, month: 259900, year: 2199900,
        refundsDay: 0, refundsMonth: 1999, refundsYear: 21999
      },
      nextInvoice: { date: new Date(now + 1000*60*60*24*12).toISOString(), amount: 259900 }
    }
  });
}
