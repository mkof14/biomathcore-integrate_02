/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
import { listDevices, connectDevice } from "@/lib/repos/deviceRepo";
export const runtime = "nodejs";

function ok(data: unknown) {
  return NextResponse.json({ ok: true, data });
}
function bad(msg: string, code = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status: code });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = parseInt(url.searchParams.get("limit") || "50", 10);
  const cursor = url.searchParams.get("cursor") || undefined;
  const { data, nextCursor } = await listDevices({ limit, cursor });
  return ok({ rows: data, nextCursor });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({
    /* TODO: implement or remove */
  }));
  const provider = String(body?.provider || "");
  if (!provider) return bad("provider_required");
  const row = await connectDevice(provider as unknown, body?.label);
  return ok(row);
}
