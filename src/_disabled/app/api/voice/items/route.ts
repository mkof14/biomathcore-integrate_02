/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
import { listVoice, createVoice } from "@/lib/repos/voiceRepo";
export const runtime = "nodejs";
const ok = (data: unknown) => NextResponse.json({ ok: true, data });

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") || undefined;
  const biomarker = url.searchParams.get("biomarker") || undefined;
  const limit = parseInt(url.searchParams.get("limit") || "50", 10);
  const cursor = url.searchParams.get("cursor") || undefined;
  return ok(await listVoice({ q, biomarker, limit, cursor }));
}
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({
    /* TODO: implement or remove */
  }));
  return ok(await createVoice(body));
}
