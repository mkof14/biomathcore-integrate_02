import Link from "next/link";
import { CATEGORIES as STATIC_CATEGORIES } from "@/lib/service-catalog";

// Fallback на случай, если модуль пока не содержит все категории
const FALLBACK_CATEGORIES = [
  { slug: "critical-health",             title: "Critical Health",             summary: "Risks, labs, medications, urgent info." },
  { slug: "everyday-wellness",           title: "Everyday Wellness",           summary: "Daily habits, energy, stress and balance." },
  { slug: "longevity-and-anti-aging",    title: "Longevity & Anti-Aging",      summary: "Biological age, genetics and cellular health." },
  { slug: "mental-wellness",             title: "Mental Wellness",             summary: "Mindfulness, focus, mood and resilience." },
  { slug: "fitness-and-performance",     title: "Fitness & Performance",       summary: "Training, recovery and safe progress." },
  { slug: "womens-health",               title: "Women’s Health",              summary: "Cycle, hormones, pregnancy, menopause." },
  { slug: "mens-health",                 title: "Men’s Health",                summary: "Hormones, screening and vitality." },
  { slug: "beauty-and-skincare",         title: "Beauty & Skincare",           summary: "Skin health, routines and tracking." },
  { slug: "nutrition-and-diet",          title: "Nutrition & Diet",            summary: "Meal planning, macros and micronutrients." },
  { slug: "sleep-and-recovery",          title: "Sleep & Recovery",            summary: "Sleep quality, HRV and restoration." },
  { slug: "environmental-health",        title: "Environmental Health",        summary: "Air, light, noise and indoor quality." },
  { slug: "family-health",               title: "Family Health",               summary: "Kids, parents, shared care and routines." },
  { slug: "preventive-medicine",         title: "Preventive Medicine & Longevity", summary: "Screenings, vaccines, proactive care." },
  { slug: "biohacking-and-performance",  title: "Biohacking & Performance",    summary: "Protocols, wearables and experiments." },
  { slug: "senior-care",                 title: "Senior Care",                 summary: "Aging well, fall risk and independence." },
  { slug: "eye-health-suite",            title: "Eye-Health Suite",            summary: "Vision, strain and screening." },
  { slug: "digital-therapeutics-store",  title: "Digital Therapeutics Store",  summary: "Evidence-based digital programs." },
  { slug: "general-sexual-longevity",    title: "General Sexual Longevity",    summary: "Education, desire and intimacy tracking." },
  { slug: "mens-sexual-health",          title: "Men’s Sexual Health",         summary: "Erectile function, hormones, privacy-first." },
  { slug: "womens-sexual-health",        title: "Women’s Sexual Health",       summary: "Cycle-aware libido and pelvic-floor care." },
];

function uniqBySlug(arr: Array<{slug: string}>) {
  const seen = new Set<string>();
  const out: typeof arr = [];
  for (const it of arr) {
    if (it && typeof it.slug === "string" && !seen.has(it.slug)) {
      seen.add(it.slug);
      out.push(it);
    }
  }
  return out;
}

export default function Home() {
  const categories = uniqBySlug([
    ...(Array.isArray(STATIC_CATEGORIES) ? STATIC_CATEGORIES : []),
    ...FALLBACK_CATEGORIES,
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-semibold mb-6">
        BioMath Core — Service Categories
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/services/${c.slug}`}
            className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:bg-zinc-900 transition"
          >
            <div className="pr-4">
              <div className="text-lg font-medium">{c.title}</div>
              {c.summary ? (
                <div className="mt-1 text-sm text-zinc-400 line-clamp-2">{c.summary}</div>
              ) : null}
              <div className="mt-2 text-xs text-zinc-500">
                {Array.isArray((c as any).services) ? (c as any).services.length : 0} services
              </div>
            </div>
            <span className="text-xs rounded-full border border-zinc-700 px-3 py-1">Open</span>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/services"
          className="inline-flex items-center rounded-xl bg-cyan-500 px-5 py-3 text-black font-medium hover:bg-cyan-400 transition"
        >
          Go to Services hub →
        </Link>
      </div>
    </main>
  );
}
