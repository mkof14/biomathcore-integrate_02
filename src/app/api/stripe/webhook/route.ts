export const runtime = "nodejs";
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function POST(req: Request) {
  try {
    const sig = req.headers.get('stripe-signature') || '';
    const rawBody = await req.text(); // ВАЖНО: raw текст, без json()

    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) return NextResponse.json({ ok:false, error:'no-webhook-secret' }, { status: 500 });

    const event = stripe.webhooks.constructEvent(rawBody, sig, secret);

    // TODO: твоя логика обработки событий
    // if (event.type === 'checkout.session.completed') { ... }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('Stripe webhook error:', e?.message || e);
    return NextResponse.json({ ok:false, error:'invalid-signature-or-handler' }, { status: 400 });
  }
}
