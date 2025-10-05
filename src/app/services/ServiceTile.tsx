import Link from "next/link";
import type { ServiceCategory } from "./services.catalog";

export default function ServiceTile({ cat }: { cat: ServiceCategory }) {
  return (
    <Link href={`/services/${cat.slug}`} className="block rounded-2xl p-5 bg-white/60 dark:bg-slate-900/40 border border-slate-200/50 hover:shadow transition">
      <h3 className="text-lg font-semibold">{cat.title}</h3>
      {cat.description ? <p className="mt-1 text-sm opacity-80">{cat.description}</p> : null}
    </Link>
  );
}
