import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { resolveService } from "@/lib/catalog-client";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

const LegacyMount = dynamic(
  () =>
    import("../../../_legacy_routes/src__app__services__[slug]/ServiceGeneratorMount")
      .then(m => m.default)
      .catch(() => null as any),
  { ssr: false }
);

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
        {svc.summary && <p className="mt-2 text-slate-600">{svc.summary}</p>}

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
          {LegacyMount ? (
            <LegacyMount slug={slug} />
          ) : (
            <div className="text-slate-700">
              <p>
                UI for <strong>{svc.title}</strong> will appear here.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Slug: <code className="text-slate-900">{slug}</code>
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
