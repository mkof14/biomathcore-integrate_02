"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const TAGS = [
  "AI-driven",
  "RPM",
  "Family",
  "Seniors",
  "Lab-based",
  "Nutrition",
  "Mental",
  "Sleep",
  "Biohacking",
];

export default function TagFilter() {
  const params = useSearchParams();
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(params.getAll("tag"));

  function toggle(tag: string) {
    const next = selected.includes(tag)
      ? selected.filter((t) => t !== tag)
      : [...selected, tag];
    setSelected(next);
    const q = params.get("q");
    const search = new URLSearchParams();
    if (q) search.set("q", q);
    next.forEach((t) => search.append("tag", t));
    router.push(`/services?${search.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {TAGS.map((tag) => (
        <button
          key={tag}
          onClick={() => toggle(tag)}
          className={`px-3 py-1 text-xs rounded-full border ${selected.includes(tag) ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 hover:bg-slate-100"}`}
        >
          {tag}
        </button>
      ))}
      {selected.length > 0 && (
        <button
          onClick={() => {
            setSelected([]);
            router.push("/services");
          }}
          className="btn-nasa"
        >
          Clear Tags
        </button>
      )}
    </div>
  );
}
