import Link from "next/link";
import { searchCatalog } from "@/lib/search";

export const dynamic = "force-dynamic";

type Props = { searchParams?: { q?: string } };

export default async function SearchPage({ searchParams }: Props) {
  const q = (searchParams?.q ?? "").trim();
  const results = q ? searchCatalog(q, 50) : [];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">Search</h1>

        <form action="/search" className="mb-6 flex gap-3">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search categories and services…"
            className="flex-1 rounded-xl border border-slate-300 px-4 py-2"
          />
          <button
            type="submit"
            className="rounded-xl border border-slate-900 bg-slate-900 text-white px-4 py-2 hover:opacity-90"
          >
            Find
          </button>
        </form>

        {!q ? (
          <p className="text-slate-600">
            Type a query to search across the catalog.
          </p>
        ) : results.length === 0 ? (
          <p className="text-slate-600">No results for “{q}”.</p>
        ) : (
          <ul className="space-y-3">
            {results.map((r) => (
              <li key={`${r.type}:${r.slug}`}>
                <Link
                  href={r.url}
                  className="block rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-900/30 transition"
                >
                  <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                    {r.type}
                  </div>
                  <div className="text-base font-medium">{r.title}</div>
                  {r.summary && (
                    <div className="mt-1 text-sm text-slate-600">
                      {r.summary}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
