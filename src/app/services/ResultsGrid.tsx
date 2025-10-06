"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORIES } from "./services.catalog";
import { useFavorites } from "./useFavorites";
import { useAnalyticsEvent } from "./useAnalyticsEvent";

export default function ResultsGrid({ scopedTo }: { scopedTo?: string }) {
  const params = useSearchParams();
  const q = (params.get("q") || "").toLowerCase().trim();
  const tags = params.getAll("tag").map((t) => t.toLowerCase());
  const sort = params.get("sort") || "az";
  const { favs, toggle } = useFavorites();
  const { track } = useAnalyticsEvent();

  const categories = CATEGORIES.filter((c) =>
    scopedTo ? c.slug === scopedTo : true,
  );

  const matches = categories
    .map((c) => {
      let filtered = c.services.filter((s) => {
        const matchQ = q
          ? s.title.toLowerCase().includes(q) || s.slug.includes(q)
          : true;
        const matchTag =
          tags.length > 0
            ? tags.some(
                (t) =>
                  s.title.toLowerCase().includes(t) ||
                  c.title.toLowerCase().includes(t),
              )
            : true;
        return matchQ && matchTag;
      });
      if (sort === "az") {
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      }
      return { ...c, services: filtered };
    })
    .filter((c) => c.services.length > 0);

  const count = matches.reduce((acc, c) => acc + c.services.length, 0);

  if (matches.length === 0) {
    return <div className="text-sm text-slate-500">No results</div>;
  }

  return (
    <div className="space-y-8">
      <div className="text-sm text-slate-600 dark:text-slate-300/90">
        Results: <span className="font-medium">{count}</span>
        {favs.length > 0 && (
          <span>
            {" "}
            • Favorites: <span className="font-medium">{favs.length}</span>
          </span>
        )}
      </div>
      {matches.map((c) => (
        <section key={c.slug}>
          {!scopedTo ? (
            <header className="mb-3">
              <h2 className="text-lg font-semibold">
                <Link
                  href={`/services/${c.slug}`}
                  className="hover:underline"
                  onClick={() =>
                    track({
                      type: "category_click",
                      meta: { category: c.slug, from: "results_header" },
                    })
                  }
                >
                  {c.title}
                </Link>
              </h2>
            </header>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.services.map((s) => (
              <div
                key={s.slug}
                className="relative group rounded-xl border border-slate-200/60 bg-gradient-to-b from-white/80 to-white/60 dark:from-slate-900/60 dark:to-slate-900/40 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <Link
                  href={`/svc/${s.slug}`}
                  className="block rounded-xl p-4"
                  onClick={() =>
                    track({
                      type: "service_click",
                      meta: { service: s.slug, category: c.slug },
                    })
                  }
                >
                  <div className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                    {s.title}
                  </div>
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Open details
                  </div>
                </Link>
                <button
                  onClick={() => {
                    toggle(s.slug);
                    track({
                      type: "favorite_toggle",
                      meta: { service: s.slug, active: !favs.includes(s.slug) },
                    });
                  }}
                  className={`absolute top-2 right-2 h-8 w-8 inline-flex items-center justify-center rounded-full border border-slate-200/60 bg-white/80 dark:bg-slate-900/50 text-lg ${favs.includes(s.slug) ? "text-amber-500" : "text-slate-400 group-hover:text-slate-600"}`}
                  title="Toggle favorite"
                >
                  ★
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
