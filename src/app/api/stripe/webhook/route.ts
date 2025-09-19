/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(_req: Request) {
  return NextResponse.json({ ok: true });
}
