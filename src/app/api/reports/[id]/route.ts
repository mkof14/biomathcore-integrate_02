import { NextResponse } from "next/server";
import { getReport } from "@/lib/report-engine/store";
export const runtime = "nodejs";
export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const id = ctx.params?.id;
  const rep = id ? getReport(id) : undefined;
  if (!rep) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ report: rep });
}
