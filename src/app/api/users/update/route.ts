/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function POST(req: Request) {
  // pretend updated ok
  return NextResponse.json({ ok: true });
}
