"use client";
import * as React from "react";

async function createCheckout(priceId: string) {
  const r = await fetch("/api/stripe/create-checkout-session", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ priceId })
  });
  if (!r.ok) {
    const text = await r.text();
    alert("Checkout error: " + text);
    return;
  }
  const { url } = await r.json();
  if (url) window.location.href = url;
}

export default function CheckoutButtons() {
  const starter = process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER!;
  const plus    = process.env.NEXT_PUBLIC_STRIPE_PRICE_PLUS!;
  const pro     = process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO!;

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <button
        onClick={() => createCheckout(starter)}
        className="rounded-xl px-4 py-3 bg-cyan-300 hover:bg-cyan-200 text-black font-semibold shadow"
      >
        Get Starter
      </button>
      <button
        onClick={() => createCheckout(plus)}
        className="rounded-xl px-4 py-3 bg-sky-400 hover:bg-sky-300 text-black font-semibold shadow"
      >
        Get Plus
      </button>
      <button
        onClick={() => createCheckout(pro)}
        className="rounded-xl px-4 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow"
      >
        Get Pro
      </button>
    </div>
  );
}
