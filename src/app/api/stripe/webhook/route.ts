export const runtime = "nodejs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) return NextResponse.json({ ok:false }, { status:400 });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2024-06-20" } as any);
  const buf = Buffer.from(await req.arrayBuffer());
  let evt;
  try {
    evt = stripe.webhooks.constructEvent(buf, sig, secret);
  } catch (e:any) {
    return NextResponse.json({ ok:false, error:e.message }, { status:400 });
  }
  // TODO: обработать evt.type
  return NextResponse.json({ ok:true });
}
