"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  placeholder?: string;
  scopedTo?: string;
};

export default function SearchBox({
  placeholder = "Search services…",
  scopedTo,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setQ(searchParams.get("q") ?? "");
  }, [searchParams]);

  const resetHref = useMemo(() => {
    const base = scopedTo ? `/services/${scopedTo}` : "/services";
    return base;
  }, [scopedTo]);

  return (
    <div className="flex items-center gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const base = scopedTo ? `/services/${scopedTo}` : "/services";
            const url = q.trim().length
              ? `${base}?q=${encodeURIComponent(q.trim())}`
              : base;
            router.push(url);
          }
        }}
        className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
        placeholder={placeholder}
        aria-label="Search"
      />
      <button
        onClick={() => router.push(resetHref)}
        className="rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/30"
      >
        Reset
      </button>
      <button
        onClick={() => {
          const base = scopedTo ? `/services/${scopedTo}` : "/services";
          const url = q.trim().length
            ? `${base}?q=${encodeURIComponent(q.trim())}`
            : base;
          router.push(url);
        }}
        className="btn-nasa"
      >
        Search
      </button>
    </div>
  );
}
