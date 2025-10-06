import { categoryClassFor } from "@/app/_components/CategoryVisual";
import { categoryColorFor } from "@/app/_components/CategoryVisual";
import {
  CATEGORY_COLOR,
  CATEGORY_ICON,
} from "@/app/_components/CategoryVisual";
import { findCategoryByServiceSlug } from "@/app/services/services.catalog";
import Link from "next/link";
import type { ServiceCategory } from "./services.catalog";

export default function ServiceTile({ cat }: { cat: ServiceCategory }) {
  const slug = item?.categorySlug || category?.slug || item?.slug || "";
  const svcColor = categoryColorFor(slug, item?.title);

  const titleColor = categoryClassFor(slug);

  const titleColor = categoryClassFor(slug);

  const cat = findCategoryByServiceSlug?.(item?.slug) as any;
  const slug = cat?.slug ?? "";
  const color = (CATEGORY_COLOR as any)[slug] ?? "text-slate-200";
  const Icon = (CATEGORY_ICON as any)[slug] ?? null;

  return (
    <Link
      href={`/services/${cat.slug}`}
      className="group nasa-card block rounded-3xl p-6 border border-slate-200/50  /95 /75 dark:/70 dark:/40 backdrop-blur-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cat-glass"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {cat.title}
        </h3>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/60 bg-white/80 dark:bg-slate-900/50 text-slate-500 group-hover:text-sky-600 shadow-sm">
          →
        </span>
      </div>
      {cat.description ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-600/90 dark:text-slate-300/90">
          {cat.description}
        </p>
      ) : null}
    </Link>
  );
}
