"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORIES } from "./services.catalog";

export default function ResultsGrid({ scopedTo }: { scopedTo?: string }) {
  const params = useSearchParams();
  const q = (params.get("q") || "").toLowerCase().trim();

  const categories = CATEGORIES.filter((c) =>
    scopedTo ? c.slug === scopedTo : true,
  );

  const matches = categories
    .map((c) => {
      const filtered = q
        ? c.services.filter(
            (s) =>
              s.title.toLowerCase().includes(q) ||
              s.slug.toLowerCase().includes(q) ||
              c.title.toLowerCase().includes(q),
          )
        : c.services;
      return { ...c, services: filtered };
    })
    .filter((c) => c.services.length > 0);

  if (matches.length === 0) {
    return <div className="text-sm text-slate-500">No results</div>;
  }

  return (
    <div className="space-y-8">
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
              <Link
                key={s.slug}
                href={`/svc/${s.slug}`}
                className="block rounded-xl p-4 bg-white/60 dark:bg-slate-900/40 border border-slate-200/50 hover:shadow"
              >
                <div className="text-base font-medium">{s.title}</div>
                {s.shortHint ? (
                  <div className="text-xs opacity-70 mt-1">{s.shortHint}</div>
                ) : null}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
