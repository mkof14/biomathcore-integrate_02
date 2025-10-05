import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategory } from "@/lib/service-catalog";
import { fetchServicesByCategory } from "@/lib/catalog-client";

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export const dynamicParams = false;
export const dynamic = "force-dynamic";

export default async function ServicesCategoryPage({ params }: Props) {
  const { category } = await params;

  const cat = getCategory(category);
  if (!cat) return notFound();

  const apiServices = await fetchServicesByCategory(cat.slug);
  const apiSet = new Set(apiServices.map((s) => s.slug));
  const merged = [
    ...apiServices.map((s) => ({
      slug: s.slug!,
      title: s.title || s.slug!,
      summary: s.summary,
    })),
    ...((cat.services ?? []).filter((s) => !apiSet.has(s.slug))),
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <nav className="mb-6 text-sm">
          <Link href="/services" className="text-slate-600 hover:text-slate-900">
            ← All Categories
          </Link>
        </nav>

        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">{cat.title}</h1>
          {cat.summary && <p className="mt-2 text-slate-600">{cat.summary}</p>}
        </header>

        {merged.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-600">
            Services for this category will appear here.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {merged.map((s) => (
              <Link
                key={s.slug}
                href={`/svc/${s.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-900/30 transition"
              >
                <h3 className="text-base font-medium">{s.title}</h3>
                {s.summary && <p className="mt-1 text-sm text-slate-600">{s.summary}</p>}
                <span className="mt-3 inline-block text-xs text-slate-500">Open</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
