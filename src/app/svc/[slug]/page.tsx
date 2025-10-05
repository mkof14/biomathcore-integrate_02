import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/service-catalog";
import ClientLegacy from "./ClientLegacy";

type Props = { params: Promise<{ slug: string }> };

export default async function SvcPage({ params }: Props) {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) return notFound();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-3xl px-6 py-12">
        <nav className="mb-6 text-sm">
          <Link href="/services" className="text-slate-600 hover:text-slate-900">Services</Link>
          {svc.categorySlug && (
            <>
              <span className="mx-1 text-slate-400">/</span>
              <Link href={`/services/${svc.categorySlug}`} className="text-slate-600 hover:text-slate-900">
                {svc.categoryTitle ?? svc.categorySlug}
              </Link>
            </>
          )}
          <span className="mx-1 text-slate-400">/</span>
          <span className="text-slate-900">{svc.title}</span>
        </nav>

        <h1 className="text-2xl md:text-3xl font-semibold">{svc.title}</h1>
        {svc.summary && <p className="mt-2 text-slate-600">{svc.summary}</p>}

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
          <ClientLegacy slug={slug} />
          <div className="mt-4 text-slate-700">
            <p className="text-sm text-slate-500">
              Slug: <code className="text-slate-900">{slug}</code>
            </p>
            {svc.categorySlug && (
              <p className="mt-2 text-sm text-slate-500">
                Category:{" "}
                <Link className="text-cyan-700 hover:underline" href={`/services/${svc.categorySlug}`}>
                  {svc.categoryTitle ?? svc.categorySlug}
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
