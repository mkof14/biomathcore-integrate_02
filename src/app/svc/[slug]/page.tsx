export const dynamicParams = true;
export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { getService } from "@/lib/service-catalog";
import { fetchServiceBySlug } from "@/lib/catalog-client";

type Props = { params: Promise<{ slug: string }> };

export default async function ServiceDetailsPage({ params }: Props) {
  const { slug } = await params;

  const found = getService(slug);
  if (!found) return notFound();

  const { category, service } = found;

  // Пытаемся получить подробности из API (опционально)
  const api = await fetchServiceBySlug(slug);
  const title = api?.title || service.title;
  const summary = api?.summary || service.summary;
  const body = api?.bodyHtml || api?.body || null; // адаптируй под своё API

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-3xl px-6 py-12">
        <nav className="mb-6 text-sm flex items-center gap-2 text-slate-600">
          <Link href="/services" className="hover:text-slate-900">Services</Link>
          <span>›</span>
          <Link href={`/services/${category.slug}`} className="hover:text-slate-900">
            {category.title}
          </Link>
          <span>›</span>
          <span className="text-slate-900">{title}</span>
        </nav>

        <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
        {summary && <p className="mt-2 text-slate-600">{summary}</p>}

        {body ? (
          <article className="prose prose-slate mt-6">
            {/* Рендер HTML из API (используй только если доверяешь источнику)
               Альтернатива — отрендерить Markdown. */}
            <div dangerouslySetInnerHTML={{ __html: body }} />
          </article>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-600">
            Detailed content will appear here.
          </div>
        )}
      </section>
    </main>
  );
}
