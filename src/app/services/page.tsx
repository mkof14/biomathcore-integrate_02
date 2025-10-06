import Breadcrumbs from "./Breadcrumbs";
import SearchBox from "./SearchBox";
import TagFilter from "./TagFilter";
import { CATEGORIES } from "./services.catalog";
import ResultsGrid from "./ResultsGrid";

export default function ServicesPage() {
  return (
    <main>
      <Breadcrumbs
        items={[{ href: "/", label: "Home" }, { label: "Services" }]}
      />
      <header className="mb-5">
        <h1 className="text-2xl md:text-3xl font-bold">Services</h1>
        <p className="mt-2 text-slate-600">
          All categories ({CATEGORIES.length}) and services.
        </p>
      </header>
      <div className="mb-4">
        <SearchBox placeholder="Search across all services…" />
      </div>
      <div className="mb-6">
        <TagFilter />
      </div>
      <ResultsGrid />
    </main>
  );
}
