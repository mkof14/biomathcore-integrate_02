import { NextResponse } from "next/server";
import { getReportRepo } from "@/lib/repos/reportRepo";

export const runtime = "nodejs";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const repo = getReportRepo();
  const report = id ? await repo.get(id) : null;
  if (!report) return NextResponse.json({ ok:false, error:"not_found" }, { status:404 });
  return NextResponse.json({ ok:true, report });
}
