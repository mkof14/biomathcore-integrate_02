"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortControl({ scopedTo }: { scopedTo?: string }) {
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = scopedTo ? `/services/${scopedTo}` : "/services";
  const sort = sp.get("sort") || "az";
  const q = sp.get("q") || "";
  const tags = sp.getAll("tag");

  function apply(next: string) {
    const s = new URLSearchParams();
    if (q) s.set("q", q);
    tags.forEach((t) => s.append("tag", t));
    if (next !== "az") s.set("sort", next);
    router.push(`${pathname}?${s.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-slate-600">Sort</label>
      <select
        value={sort}
        onChange={(e) => apply(e.target.value)}
        className="rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 px-2 py-2 text-sm services-sort pr-8 services-sort pr-8"
        aria-label="Sort"
      >
        <option value="az">A–Z</option>
        <option value="new">Newest</option>
        <option value="pop">Popular</option>
      </select>
    </div>
  );
}
