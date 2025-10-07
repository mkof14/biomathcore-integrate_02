/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
import { createAIRun } from "@/lib/repos/aiRepo";
import { withLog } from "@/lib/api/log";
export const runtime = "nodejs";

export const POST = withLog(async () => {
  const samples = [
    { prompt: "Summarize intake", status: "done" },
    { prompt: "Draft plan", status: "queued" },
    { prompt: "Explain lab", status: "failed" },
  ];
  for (const s of samples) await createAIRun(s as unknown);
  return NextResponse.json({ ok: true, created: samples.length });
}, "ai.dev.seed");
