/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const payload = await req.json().catch(() => ({ /* TODO: implement or remove */ }));
  // TODO: save to DB later. For now always succeed.
  return NextResponse.json({ ok: true, echo: payload });
}
