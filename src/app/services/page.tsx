import ServiceTile from "./ServiceTile";
import { CATEGORIES } from "./services.catalog";

export default function ServicesPage() {
  return (
    <main className="px-6 py-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Services</h1>
        <p className="mt-2 text-slate-600">
          Explore categories and open details per topic.
        </p>
      </header>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => (
          <ServiceTile key={cat.slug} cat={cat} />
        ))}
      </section>
    </main>
  );
}
