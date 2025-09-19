export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { getReportRepo } from "@/lib/repos/reportRepo";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const params = await ctx.params;
  const id = params?.id;
  const repo = getReportRepo();
  const report = id ? await repo.get(id) : null;
  if (!report) return NextResponse.json({ ok:false, error:"not_found" }, { status:404 });
  return NextResponse.json({ ok:true, report });
}
