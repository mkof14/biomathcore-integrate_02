/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
import { createReport } from "@/lib/repos/reportRepo";
import { withLog } from "@/lib/api/log";
export const runtime = "nodejs";

export const POST = withLog(async () => {
  const samples = [
    { title: "Weekly summary", status: "ready" },
    { title: "Device telemetry", status: "draft" },
    { title: "Clinical note", status: "archived" },
  ];
  for (const s of samples) await createReport(s as unknown);
  return NextResponse.json({ ok: true, created: samples.length });
}, "reports.dev.seed");

export /* TODO: implement or remove */ {};
