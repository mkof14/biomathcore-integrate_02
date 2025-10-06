import { NextResponse } from "next/server";
import { buildSampleReport } from "@/lib/reports/sample-data";
import type { ReportPlan } from "@/types/report";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ plan: string }> },
) {
  const { plan: rawPlan } = await params;
  const plan = (rawPlan || "").toLowerCase() as ReportPlan;

  if (!["core", "daily", "max"].includes(plan)) {
    return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
  }
  const report = buildSampleReport(plan, undefined);
  return NextResponse.json(report, { status: 200 });
}
