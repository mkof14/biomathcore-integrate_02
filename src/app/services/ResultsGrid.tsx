"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORIES } from "./services.catalog";
import { useFavorites } from "./useFavorites";

export default function ResultsGrid({ scopedTo }: { scopedTo?: string }) {
  const params = useSearchParams();
  const q = (params.get("q") || "").toLowerCase().trim();
  const tags = params.getAll("tag").map((t) => t.toLowerCase());
  const { favs, toggle } = useFavorites();

  const categories = CATEGORIES.filter((c) =>
    scopedTo ? c.slug === scopedTo : true,
  );

  const matches = categories
    .map((c) => {
      const filtered = c.services.filter((s) => {
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
      return { ...c, services: filtered };
    })
    .filter((c) => c.services.length > 0);

  const count = matches.reduce((acc, c) => acc + c.services.length, 0);

  if (matches.length === 0) {
    return <div className="text-sm text-slate-500">No results</div>;
  }

  return (
    <div className="space-y-8">
      <div className="text-sm text-slate-500">
        Results: {count}
        {favs.length > 0 && ` • Favorites: ${favs.length}`}
      </div>
      {matches.map((c) => (
        <section key={c.slug}>
          {!scopedTo ? (
            <header className="mb-3">
              <h2 className="text-lg font-semibold">
                <Link href={`/services/${c.slug}`} className="hover:underline">
                  {c.title}
                </Link>
              </h2>
            </header>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.services.map((s) => (
              <div key={s.slug} className="relative group">
                <Link
                  href={`/svc/${s.slug}`}
                  className="block rounded-xl p-4 bg-white/60 dark:bg-slate-900/40 border border-slate-200/50 hover:shadow"
                >
                  <div className="text-base font-medium">{s.title}</div>
                </Link>
                <button
                  onClick={() => toggle(s.slug)}
                  className={`absolute top-2 right-2 text-lg ${favs.includes(s.slug) ? "text-yellow-500" : "text-slate-400 group-hover:text-slate-600"}`}
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
