"use client";
import { usePathname } from "next/navigation";

export default function ClientActions({
  serviceSlug,
  categoryHref,
}: {
  serviceSlug: string;
  categoryHref?: string;
}) {
  const pathname = usePathname();
  const isBrowser = typeof window !== "undefined";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(
        (isBrowser ? window.location.origin : "") + pathname,
      );
      alert("Link copied");
    } catch {}
  }

  async function webShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "BioMath Core Service",
          url: isBrowser ? window.location.href : undefined,
        });
      } else {
        copyLink();
      }
    } catch {}
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => history.back()}
        className="rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/30"
      >
        ← Назад
      </button>
      {categoryHref ? (
        <a
          href={categoryHref}
          className="rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/30"
        >
          Категория
        </a>
      ) : null}
      <button
        onClick={copyLink}
        className="rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/30"
      >
        Copy Link
      </button>
      <button
        onClick={webShare}
        className="rounded-md bg-slate-900 text-white px-3 py-2 text-sm hover:opacity-90 dark:bg-slate-100 dark:text-slate-900"
      >
        Share
      </button>
      <button
        className="rounded-md bg-gradient-to-r from-sky-600 via-teal-500 to-emerald-500 text-white px-3 py-2 text-sm hover:opacity-95"
        onClick={() => alert("Coming soon")}
      >
        Start
      </button>
    </div>
  );
}
