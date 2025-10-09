import Link from "next/link";

type Tier = {
  id: "core" | "daily" | "max" | "enterprise";
  name: string;
  price: string;
  blurb: string;
  highlight?: boolean;
  features: string[];
};

const TIERS: Tier[] = [
  {
    id: "core",
    name: "Core",
    price: "$19",
    blurb: "Essentials to build a daily habit.",
    features: [
      "Biological Age Report (monthly refresh)",
      "Daily habit prompts & check-ins",
      "Foundational insights in key categories",
      "Basic AI guidance, chat history",
      "Weekly summaries & simple goals",
    ],
  },
  {
    id: "daily",
    name: "Daily",
    price: "$39",
    blurb: "Guided, everyday momentum—get better faster.",
    highlight: true,
    features: [
      "Everything in Core, plus",
      "Daily routines & nudges by category",
      "Personalized nutrition & sleep tips",
      "Priority AI insights & summaries",
      "More granular habit analytics",
      "Device data import (batch)",
    ],
  },
  {
    id: "max",
    name: "Max",
    price: "$79",
    blurb: "All-in performance with deep personalization.",
    features: [
      "Everything in Daily, plus",
      "Advanced AI: multi-step plans, Q&A, context",
      "Wearable + labs + lifestyle unified view",
      "Pro-level recovery & longevity insights",
      "Early-signal detection & alerts",
      "Priority support & roadmap access",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    blurb: "For teams & organizations.",
    features: [
      "Admin controls & SSO",
      "Bulk onboarding",
      "Dedicated support",
      "Custom integrations",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center rounded-full bg-rose-900/30 px-3 py-1 text-xs text-rose-300">Pricing</div>
        <h1 className="mt-3 text-3xl font-semibold">Choose a plan you can use every day.</h1>
        <p className="mt-2 text-sm text-gray-400">Upgrade any time.</p>
      </div>

      {/* переключатель (визуальный, без Stripe) */}
      <div className="mb-8 flex items-center justify-center gap-3 text-sm">
        <span className="rounded-full bg-gray-800 px-3 py-1">Monthly</span>
        <span className="text-gray-500">/</span>
        <span className="rounded-full px-3 py-1 text-gray-500">Yearly</span>
      </div>

      <section className="grid gap-6 md:grid-cols-3">
        {TIERS.slice(0, 3).map((t) => (
          <article
            key={t.id}
            className={`rounded-2xl border p-6 ${t.highlight ? "border-emerald-600 bg-emerald-900/10" : "border-gray-800"}`}
          >
            <div className="mb-2 inline-flex rounded-full px-2 py-0.5 text-xs
              ${t.highlight ? "bg-emerald-700/30 text-emerald-200" : "bg-gray-700/30 text-gray-300"}`}>
              {t.name}
            </div>

            <p className="text-sm text-gray-300">{t.blurb}</p>

            <div className="mt-4">
              <span className="text-4xl font-bold">{t.price}</span>
              <span className="ml-1 text-sm text-gray-400">/mo</span>
            </div>

            <h3 className="mt-5 text-sm font-semibold text-gray-300">What you get</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-200">
              {t.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span aria-hidden className="mt-1 inline-block h-2 w-2 rounded-full bg-current" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              {/* без Stripe: просто ведём на форму регистрации с выбранным планом */}
              <Link
                href={t.id === "enterprise" ? `/contact?plan=${t.id}` : `/sign-up?plan=${t.id}`}
                className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition
                  ${t.highlight ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                 : "bg-gray-900 text-white hover:bg-black"}`}
                prefetch={false}
              >
                Buy Now
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* Enterprise карточка во всю ширину */}
      <section className="mt-6">
        {TIERS.slice(3).map((t) => (
          <article key={t.id} className="rounded-2xl border border-gray-800 p-6">
            <div className="mb-2 inline-flex rounded-full bg-gray-700/30 px-2 py-0.5 text-xs text-gray-300">
              {t.name}
            </div>
            <p className="text-sm text-gray-300">{t.blurb}</p>
            <ul className="mt-3 grid gap-2 text-sm text-gray-200 md:grid-cols-2">
              {t.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span aria-hidden className="mt-1 inline-block h-2 w-2 rounded-full bg-current" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href={`/contact?plan=${t.id}`}
                className="inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
                prefetch={false}
              >
                Contact Sales
              </Link>
            </div>
          </article>
        ))}
      </section>

      <p className="mt-6 text-right text-xs text-gray-500">
        Cancel anytime. You can upgrade or downgrade later.
      </p>
    </main>
  );
}
