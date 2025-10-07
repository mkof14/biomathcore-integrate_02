import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allServicesFlat,
  findServiceBySlug,
  findCategoryByServiceSlug,
} from "@/app/services/services.catalog";
import ClientActions from "./ClientActions";
import BackClient from "./BackClient";
import AIOpinions from "./AIOpinions";

export async function generateStaticParams() {
  return allServicesFlat().map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const isAI = (slug ?? "").startsWith("ai-");
  const s = findServiceBySlug(slug);
  if (!s) return notFound();
  const cat = findCategoryByServiceSlug(slug);

  return (
    <main className={`px-6 py-8 max-w-3xl mx-auto ${isAI ? 'ai-white-text' : ''}`}>
    <BackClient />
      <h1 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-sky-700 dark:text-sky-400">
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
        <div className="rounded-3xl border border-slate-200/50 bg-gradient-to-br from-white/95 to-white/75 dark:from-slate-900/70 dark:to-slate-900/40 backdrop-blur-md p-6 shadow-lg">
          <p>
            Details to be connected with Reports/Questionnaires and data
            pipelines.
          </p>
        </div>
      </article>

      <AIOpinions serviceTitle={s.title} />
    </main>
  );
}
