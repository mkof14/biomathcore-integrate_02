import Link from "next/link";
import type { ServiceCategory } from "./services.catalog";

export default function ServiceTile({ cat }: { cat: ServiceCategory }) {
  return (
    <Link
      href={`/services/${cat.slug}`}
      className="group block rounded-3xl p-6 border border-slate-200/50 bg-gradient-to-br from-white/95 to-white/75 dark:from-slate-900/70 dark:to-slate-900/40 backdrop-blur-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 dark:from-sky-400 dark:via-cyan-300 dark:to-teal-300 drop-shadow-sm">
          {cat.title}
        </h3>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/60 bg-white/80 dark:bg-slate-900/50 text-slate-500 group-hover:text-sky-600 shadow-sm">
          →
        </span>
      </div>
      {cat.description ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-600/90 dark:text-slate-300/90">
          {cat.description}
        </p>
      ) : null}
    </Link>
  );
}
