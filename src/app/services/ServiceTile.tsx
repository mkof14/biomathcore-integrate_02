import Link from "next/link";
import type { ServiceCategory } from "./services.catalog";

export default function ServiceTile({ cat }: { cat: ServiceCategory }) {
  return (
    <Link
      href={`/services/${cat.slug}`}
      className="group block rounded-2xl p-5 border border-slate-200/60 bg-gradient-to-b from-white/80 to-white/60 dark:from-slate-900/60 dark:to-slate-900/40 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-teal-500 dark:from-sky-400 dark:to-teal-300">
          {cat.title}
        </h3>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/60 bg-white/70 dark:bg-slate-900/50 text-slate-500 group-hover:text-sky-600">
          →
        </span>
      </div>
      {cat.description ? (
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300/90 leading-relaxed">
          {cat.description}
        </p>
      ) : null}
    </Link>
  );
}
