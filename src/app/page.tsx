import Link from "next/link";
import { CATEGORIES } from "@/lib/service-catalog";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">BioMath Core — Service Categories</h1>
          <p className="mt-3 text-slate-300">Explore categories. Each card opens the Services hub filtered to that category.</p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/services/${cat.slug}`}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-cyan-500/50 hover:bg-slate-900 transition"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-medium">{cat.title}</h3>
                <span className="rounded-xl border border-slate-700 px-2 py-0.5 text-xs text-slate-300 group-hover:border-cyan-500/40">Open</span>
              </div>
              {cat.summary && <p className="mt-2 text-sm text-slate-400">{cat.summary}</p>}
            </Link>
          ))}
        </div>
        <div className="mt-10 text-right">
          <Link href="/services" className="inline-block rounded-xl bg-cyan-500/90 px-4 py-2 text-slate-950 font-semibold hover:bg-cyan-400 transition">Go to Services hub →</Link>
        </div>
      </section>
    </main>
  );
}
