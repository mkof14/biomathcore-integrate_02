import Link from "next/link";
import { CATEGORIES as STATIC_CATEGORIES } from "@/lib/service-catalog";

export default async function Home() {
  const categories = STATIC_CATEGORIES;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-semibold mb-3">BioMath Core — Service Categories</h1>
      <p className="text-zinc-400 mb-10">
        Explore categories. Each card opens the Services hub filtered to that category.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/services/${c.slug}`}
            className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:bg-zinc-900 transition"
          >
            <div className="pr-4">
              <div className="text-lg font-medium">{c.title}</div>
              {c.summary && (
                <div className="mt-1 text-sm text-zinc-400 line-clamp-2">{c.summary}</div>
              )}
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
