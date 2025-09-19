/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Optional: console.log("AUTOSAVE", body); // intentionally no DB writes
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}
