/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
import { listAIRuns, createAIRun } from "@/lib/repos/aiRepo";

export const runtime = "nodejs";
const ok = (data: unknown) => NextResponse.json({ ok:true, data });

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") || undefined;
  const status = url.searchParams.get("status") || undefined;
  const limit = parseInt(url.searchParams.get("limit") || "50", 10);
  const cursor = url.searchParams.get("cursor") || undefined;
  const out = await listAIRuns({ q, status, limit, cursor });
  return ok(out);
}

export async function POST(req: Request) {
  const body = await req.json().catch(()=> ({ /* TODO: implement or remove */ }));
  const row = await createAIRun(body);
  return ok(row);
}
