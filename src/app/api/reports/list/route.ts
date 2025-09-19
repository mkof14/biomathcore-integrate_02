/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
import { listReports } from "@/lib/report-engine/store";
export const runtime = "nodejs";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "U1001";
  const items = listReports(userId).map(r=>({ id:r.id, title:r.title, createdAt:r.createdAt }));
  return NextResponse.json({ items });
}
