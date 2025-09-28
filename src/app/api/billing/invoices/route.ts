/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET() {
  const base = Date.now();
  const mk = (i:number, status:"paid"|"open"|"void"|"refunded") => ({
    id: "INV-"+(1000+i),
    date: new Date(base - i*86400000).toISOString(),
    amount: 259900,
    status,
    url: "https://example.com/invoice-"+(1000+i)+".pdf"
  });
  return NextResponse.json({
    invoices: [mk(2,"paid"), mk(33,"paid"), mk(65,"paid"), mk(97,"refunded"), mk(128,"paid")]
  });
}
