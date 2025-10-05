import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategory } from "@/lib/service-catalog";

type Props = {
  params: { category: string; service: string };
};

export const dynamicParams = true;

export default function ServiceDetailsPage({ params }: Props) {
  const cat = getCategory(params.category);
  if (!cat) return notFound();

  const svc = (cat.services ?? []).find((s) => s.slug === params.service);
  if (!svc) return notFound();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-3xl px-6 py-12">
        <nav className="mb-6 text-sm">
          <Link href={`/services/${cat.slug}`} className="text-slate-600 hover:text-slate-900">
            ← {cat.title}
          </Link>
        </nav>

        <h1 className="text-2xl md:text-3xl font-semibold">{svc.title}</h1>
        {svc.summary && <p className="mt-2 text-slate-600">{svc.summary}</p>}

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-slate-700">
            Service content goes here.
          </p>
        </div>
      </section>
    </main>
  );
}
