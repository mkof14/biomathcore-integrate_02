"use client";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const SearchBox   = dynamic(() => import("../SearchBox"),   { ssr: false });
const TagFilter   = dynamic(() => import("../TagFilter"),   { ssr: false });
const SortControl = dynamic(() => import("../SortControl"), { ssr: false });
const ResultsGrid = dynamic(() => import("../ResultsGrid"), { ssr: false });

export default function ServicesCategoryClient({ category }: { category: string }) {
  return (
    <main className="p-6 mx-auto max-w-6xl">
      <h1 className="text-2xl font-semibold mb-4">Services</h1>
      <Suspense fallback={<div className="text-gray-400">Loading…</div>}>
        <div className="mb-4"><SearchBox /></div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
          <TagFilter initialCategory={category} />
          <SortControl />
        </div>
        <ResultsGrid category={category} />
      </Suspense>
    </main>
  );
}
