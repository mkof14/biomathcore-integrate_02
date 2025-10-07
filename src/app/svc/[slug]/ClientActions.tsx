"use client";
import { usePathname } from "next/navigation";
import { Copy, Share2, Printer, Download } from "lucide-react";

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

  function printPage() {
    if (typeof window !== "undefined") window.print();
  }

  function downloadSummary() {
    const content = [
      `Service: ${serviceSlug}`,
      `URL: ${typeof window !== "undefined" ? window.location.href : ""}`,
      "",
      "Summary:",
      "- Findings and recommendations will be shown here after generation.",
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${serviceSlug}-summary.txt`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => history.back()}
        className="rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/30"
      >
        ← Back
      </button>
      {categoryHref ? (
        <a
          href={categoryHref}
          className="rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/30"
        >
          Category
        </a>
      ) : null}

      <button
        onClick={copyLink}
        className="inline-flex items-center gap-2 rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/30"
      >
        <Copy className="h-4 w-4" /> Copy
      </button>

      <button
        onClick={webShare}
        className="inline-flex items-center gap-2 rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/30"
      >
        <Share2 className="h-4 w-4" /> Share
      </button>

      <button
        onClick={printPage}
        className="inline-flex items-center gap-2 rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/30"
      >
        <Printer className="h-4 w-4" /> Print
      </button>

      <button
        onClick={downloadSummary}
        className="btn-nasa"
      >
        <Download className="h-4 w-4" /> Download
      </button>
    </div>
  );
}
