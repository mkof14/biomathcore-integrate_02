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
          <div className="grid motion-safe:animate-bmc-fade-in gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.services.map((s) => (
              <div
                key={s.slug}
                className="relative group rounded-3xl border border-slate-200/50 bg-gradient-to-br from-white/95 to-white/75 dark:from-slate-900/70 dark:to-slate-900/40 backdrop-blur-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <Link
                  href={`/svc/${s.slug}`}
                  className="block rounded-3xl p-5"
                  onClick={() =>
                    track({
                      type: "service_click",
                      meta: { service: s.slug, category: c.slug },
                    })
                  }
                >
                  <h3 className="text-lg font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 dark:from-sky-400 dark:via-cyan-300 dark:to-teal-300 drop-shadow-sm">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Click to view details
                  </p>
                </Link>
                <button
                  onClick={() => {
                    toggle(s.slug);
                    track({
                      type: "favorite_toggle",
                      meta: { service: s.slug, active: !favs.includes(s.slug) },
                    });
                  }}
                  className={`absolute top-3 right-3 h-9 w-9 inline-flex items-center justify-center rounded-full border border-slate-200/60 bg-white/90 dark:bg-slate-900/50 text-lg shadow-sm ${favs.includes(s.slug) ? "text-amber-500" : "text-slate-400 group-hover:text-slate-600"}`}
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
