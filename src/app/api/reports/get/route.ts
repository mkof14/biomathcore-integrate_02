import { NextResponse } from "next/server";
import { getReport } from "@/lib/report-engine/store";
export const runtime = "nodejs";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error:"missing id" }, { status: 400 });
  const rep = getReport(id);
  if (!rep) return NextResponse.json({ error:"not found" }, { status: 404 });
  return NextResponse.json({ report: rep });
}
