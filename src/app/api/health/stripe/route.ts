/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
import Stripe from "stripe";
export const runtime = "nodejs";

export async function GET() {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key)
      return NextResponse.json(
        { ok: false, error: "Missing STRIPE_SECRET_KEY" },
        { status: 200 },
      );
    const stripe = new Stripe(key, { apiVersion: "2024-06-20" as unknown });
    const acct = await stripe.accounts.retrieve();
    return NextResponse.json({
      ok: true,
      account: {
        id: acct.id,
        type: acct?.type,
        country: (acct as unknown)?.country,
      },
      mode: key.startsWith("sk_live_") ? "live" : "test",
    });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Stripe error" },
      { status: 200 },
    );
  }
}
