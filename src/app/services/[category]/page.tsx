import { notFound } from "next/navigation";
import { categoryColorFor } from "@/app/_components/CategoryVisual";
import Breadcrumbs from "../Breadcrumbs";
import SearchBox from "../SearchBox";
import { CATEGORIES, findCategory } from "../services.catalog";
import ResultsGrid from "../ResultsGrid";
import SortControl from "../SortControl";

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = findCategory(category);
  if (!cat) return notFound();

  return (
    <main>
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { label: cat.title },
        ]}
      />
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-sky-800 dark:text-sky-300">
          {cat.title}
        </h1>
        {cat.description ? (
          <p className="mt-2 text-slate-600 dark:text-slate-300/90">
            {cat.description}
          </p>
        ) : null}
      </header>
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1">
          <SearchBox
            placeholder="Search within this category…"
            scopedTo={cat.slug}
          />
        </div>
        <SortControl scopedTo={cat.slug} />
      </div>
      <div className="rounded-3xl border border-slate-200/50 bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-900/60 dark:to-slate-900/30 backdrop-blur-md p-6 shadow-lg hover:shadow-xl transition-all">
        <ResultsGrid scopedTo={cat.slug} />
      </div>
    </main>
  );
}
