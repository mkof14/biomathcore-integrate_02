import Link from "next/link";
import { fetchCategories } from "@/lib/catalog-client";
import { CATEGORIES } from "@/lib/service-catalog";

export const dynamic = "force-dynamic";

export default async function ServicesIndexPage() {
  const api = await fetchCategories();
  const map = new Map(api.map(c => [c.slug!, c]));
  const merged = CATEGORIES.map(c => {
    const a = map.get(c.slug);
    return { slug: c.slug, title: c.title, summary: c.summary || a?.summary || "", count: a?.count as number | undefined };
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Services — All Categories</h1>
          <p className="mt-3 text-slate-600">Choose a category to see available services and tools.</p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {merged.map((c) => (
            <Link key={c.slug} href={`/services/${c.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-900/30 transition">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{c.title}</h3>
                {typeof c.count === "number" && <span className="text-xs text-slate-500">{c.count}</span>}
              </div>
              {c.summary && <p className="mt-2 text-sm text-slate-600">{c.summary}</p>}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
