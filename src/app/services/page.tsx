import { Suspense } from "react";
import Breadcrumbs from "./Breadcrumbs";
import SearchBox from "./SearchBox";
import { CATEGORIES } from "./services.catalog";
import ResultsGrid from "./ResultsGrid";
import SortControl from "./SortControl";
import TagFilter from "./TagFilter";

export const metadata = {
  title: "Services",
  description:
    "Browse BioMath Core categories and services. Filter and open detailed modules.",
};

export default function ServicesPage() {
  return (
    <main>
      <Breadcrumbs
        items={[{ href: "/", label: "Home" }, { label: "Services" }]}
      />
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-sky-800 dark:text-sky-300">
          Services
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300/90">
          All categories ({CATEGORIES.length}) and services.
        </p>
      </header>
      <div className="mb-4 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1">
          <SearchBox placeholder="Search across all services…" />
        </div>
        <SortControl />
      </div>
      <div className="mb-6">
        <TagFilter />
      </div>
      <div className="rounded-3xl border border-slate-200/50 bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-900/60 dark:to-slate-900/30 backdrop-blur-md p-6 shadow-lg hover:shadow-xl transition-all">
        <Suspense fallback={<div className="min-h-[120px]" />}>
          <ResultsGrid />
        </Suspense>
      </div>
    </main>
  );
}
