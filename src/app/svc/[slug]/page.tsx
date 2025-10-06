import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allServicesFlat,
  findServiceBySlug,
  findCategory as findCat,
  findCategoryByServiceSlug,
} from "@/app/services/services.catalog";
import ClientActions from "./ClientActions";

export async function generateStaticParams() {
  return allServicesFlat().map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = findServiceBySlug(slug);
  if (!s) return notFound();
  const cat =
    findCategoryByServiceSlug(slug) || (s ? findCat(s.slug) : undefined); // fallback

  return (
    <main className="px-6 py-8 max-w-3xl mx-auto">
      <button
        onClick={() => history.back()}
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
      >
        ← Назад
      </button>
      <h1 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-teal-500 to-emerald-500 dark:from-sky-400 dark:via-teal-300 dark:to-emerald-300">
        {s.title}
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300/90">
        Service: {s.slug}
        {cat ? (
          <>
            {" "}
            • Category:{" "}
            <Link
              href={`/services/${cat.slug}`}
              className="underline hover:no-underline"
            >
              {cat.title}
            </Link>
          </>
        ) : null}
      </p>

      <div className="mt-4">
        <ClientActions
          serviceSlug={s.slug}
          categoryHref={cat ? `/services/${cat.slug}` : undefined}
        />
      </div>

      <article className="prose prose-slate dark:prose-invert max-w-none mt-6">
        <div className="rounded-3xl border border-slate-200/50 bg-gradient-to-br from-white/95 to-white/75 dark:from-slate-900/70 dark:to-slate-900/40 backdrop-blur-md p-6 shadow-lg hover:shadow-xl transition-all">
          <p>
            Details to be connected with Reports/Questionnaires and data
            pipelines.
          </p>
        </div>
      </article>
    </main>
  );
}
