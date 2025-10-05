import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { resolveService } from "@/lib/catalog-client";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = await resolveService(slug);
  if (!svc) return { title: "Service • BioMath Core" };
  return { title: `${svc.title} • BioMath Core` };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const svc = await resolveService(slug);
  if (!svc) return notFound();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-3xl px-6 py-12">
        <nav className="mb-6 text-sm flex gap-2 text-slate-600">
          <Link href="/services" className="hover:text-slate-900">Services</Link>
          <span>/</span>
          {svc.categorySlug ? (
            <Link href={`/services/${svc.categorySlug}`} className="hover:text-slate-900">
              {svc.categoryTitle ?? svc.categorySlug}
            </Link>
          ) : (
            <span className="text-slate-400">Uncategorized</span>
          )}
          <span>/</span>
          <span className="text-slate-900">{svc.title}</span>
        </nav>

        <h1 className="text-2xl md:text-3xl font-semibold">{svc.title}</h1>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-slate-700">
            This is the <strong>{svc.title}</strong> tool. Hook your existing UI and actions here.
          </p>
          <ul className="mt-4 list-disc pl-5 text-slate-700 space-y-1">
            <li>Breadcrumbs route back to its category and the Services hub.</li>
            <li>Slug: <code className="text-slate-900">{slug}</code></li>
            {svc.categorySlug && (
              <li>Category: <Link className="text-cyan-700 hover:underline" href={`/services/${svc.categorySlug}`}>{svc.categoryTitle ?? svc.categorySlug}</Link></li>
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}
