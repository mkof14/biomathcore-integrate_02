/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
import { runBlackbox } from "@/lib/repos/blackboxRepo";
export const runtime = "nodejs";

function ok(data: unknown) {
  return NextResponse.json({ ok: true, data });
}
function bad(msg: string, code = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status: code });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({
    /* TODO: implement or remove */
  }));
  const prompt = String(body?.prompt || "");
  if (!prompt.trim()) return bad("empty_prompt");
  const row = await runBlackbox(prompt);
  return ok(row);
}
