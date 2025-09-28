/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function POST(req: Request) {
  const body = await req.json().catch(()=> ({ /* TODO: implement or remove */ }));
  return NextResponse.json({ ok:true, received: body });
}
