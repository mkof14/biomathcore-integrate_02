/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ pong: true });
}
