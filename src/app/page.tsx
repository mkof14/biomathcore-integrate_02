import Link from "next/link";
import { CATEGORIES } from "./services/services.catalog";

export default function HomePage() {
  const servicesCount = CATEGORIES.reduce((n, c) => n + c.services.length, 0);
  return (
    <main className="px-6 py-12 md:py-16 max-w-6xl mx-auto">
      <section className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-sky-800 dark:text-sky-300">
          BioMath Core
        </h1>
        <p className="mt-3 text-lg text-slate-700 dark:text-slate-300/90">
          Evidence-first wellness & longevity tools — {servicesCount}+ services
          across {CATEGORIES.length} categories.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#categories"
            className="rounded-lg border border-slate-300 dark:border-slate-700 px-5 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/30"
          >
            All Categories
          </a>
        </div>
      </section>

      <section
        id="categories"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/services/${cat.slug}`}
            className="group rounded-3xl p-6 border border-slate-200/50 bg-gradient-to-br from-white/95 to-white/75 dark:from-slate-900/70 dark:to-slate-900/40 backdrop-blur-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold tracking-tight text-sky-800 dark:text-sky-300">
                {cat.title}
              </div>
              <span className="text-xs text-slate-500">
                {cat.services.length} services
              </span>
            </div>
            {cat.description ? (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300/90">
                {cat.description}
              </p>
            ) : null}
          </Link>
        ))}
      </section>

      <div className="mt-6 flex justify-center">
        <a href="/services" className="nasa-cta">
          Explore Services
        </a>
      </div>
      <PromoDualAI />
      <HomeAdsBand />
    </main>
  );
}
