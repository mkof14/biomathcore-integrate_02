/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get("id") || "";
    const s = await stripe.checkout.sessions.retrieve(id);
    return NextResponse.json({ ok: true, data: s });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: e.message || "stripe_error" }, { status: 400 });
  }
}
