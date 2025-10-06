"use client";
import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useParams } from "next/navigation";
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
  const __catSlug =
    (typeof scopedTo !== "undefined" && scopedTo) ||
    (typeof category !== "undefined" && (category as any)?.slug) ||
    (typeof props !== "undefined" &&
      ((props as any)?.category?.slug || (props as any)?.categorySlug)) ||
    (typeof item !== "undefined" &&
      ((item as any)?.categorySlug || (item as any)?.category)) ||
    (typeof service !== "undefined" &&
      ((service as any)?.categorySlug || (service as any)?.category)) ||
    (typeof svc !== "undefined" &&
      ((svc as any)?.categorySlug || (svc as any)?.category)) ||
    (useParams?.() as any)?.category;
  const __catCls = categoryColorFor(__catSlug);

  const slug = item?.categorySlug || category?.slug || item?.slug || "";
  const svcColor = categoryColorFor(slug, item?.title);

  const titleColor = categoryClassFor(slug);

  const titleColor = categoryClassFor(slug);

  const cat = findCategoryByServiceSlug?.(item?.slug) as any;
  const slug = cat?.slug ?? "";
  const color = (CATEGORY_COLOR as any)[slug] ?? "text-slate-200";
  const Icon = (CATEGORY_ICON as any)[slug] ?? null;

  const fav = favorites?.has?.(service?.slug);

  const __favActive =
    typeof favorites !== "undefined" && typeof svc !== "undefined"
      ? !!favorites?.has?.(svc?.slug || svc?.id || svc?.key)
      : typeof favorites !== "undefined" && typeof item !== "undefined"
        ? !!favorites?.has?.(item?.slug || item?.id || item?.key)
        : typeof favorites !== "undefined" && typeof service !== "undefined"
          ? !!favorites?.has?.(service?.slug || service?.id || service?.key)
          : typeof favorites !== "undefined" && typeof props !== "undefined"
            ? !!favorites?.has?.(
                props?.slug ||
                  props?.service?.slug ||
                  props?.item?.slug ||
                  props?.id ||
                  props?.key,
              )
            : false;

  const isFav =
    typeof isFavorite !== "undefined"
      ? !!isFavorite
      : typeof favorite !== "undefined"
        ? !!favorite
        : typeof fav !== "undefined"
          ? !!fav
          : typeof favorites !== "undefined" && typeof svc !== "undefined"
            ? !!favorites?.has?.(svc?.slug || svc?.id || svc?.key)
            : typeof favorites !== "undefined" && typeof item !== "undefined"
              ? !!favorites?.has?.(item?.slug || item?.id || item?.key)
              : typeof favorites !== "undefined" && typeof row !== "undefined"
                ? !!favorites?.has?.(row?.slug || row?.id || row?.key)
                : typeof favorites !== "undefined" &&
                    typeof service !== "undefined"
                  ? !!favorites?.has?.(
                      service?.slug || service?.id || service?.key,
                    )
                  : false;
  const [fav, setFav] = useState(!!isFav);
  useEffect(() => setFav(!!isFav), [isFav]);

  return (
    <Link
      href={`/services/${cat.slug}`}
      className={`group nasa-card block rounded-3xl p-6 border border-slate-200/50  /95 /75 dark:/70 dark:/40 backdrop-blur-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cat-glass ${categoryColorFor(item?.categorySlug || item?.category || props?.category?.slug || props?.categorySlug, item?.categoryTitle || props?.category?.title)}`}
    >
      <div
        className={`flex items-center justify-between gap-4 ${categoryColorFor(item?.categorySlug || item?.category || props?.category?.slug || props?.categorySlug, item?.categoryTitle || props?.category?.title)}`}
      >
        <h3 className="{`{`{`{`{`{`{`{`${`text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 ${categoryColorFor((item as any)?.categorySlug||(item as any)?.category||(props as any)?.category?.slug||(props as any)?.categorySlug,(item as any)?.categoryTitle||(props as any)?.category?.title)}`} ${__catCls}`} ${__catCls}`} ${__catCls}`} ${__catCls}`} ${__catCls}`} ${__catCls}`} ${__catCls}`} ${__catCls}`}">
          <span className={`${__catCls}`}>
            <span className={`${__catCls}`}>
              <span className={`${__catCls}`}>{cat.title}</span>
            </span>
          </span>
        </h3>
        <span
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200/60 bg-white/80 dark:bg-slate-900/50 text-slate-500 group-hover:text-sky-600 shadow-sm ${categoryColorFor(item?.categorySlug || item?.category || props?.category?.slug || props?.categorySlug, item?.categoryTitle || props?.category?.title)}`}
        >
          →
        </span>
      </div>
      {cat.description ? (
        <p
          className={`mt-3 text-sm leading-relaxed text-slate-600/90 dark:text-slate-300/90 ${categoryColorFor(item?.categorySlug || item?.category || props?.category?.slug || props?.categorySlug, item?.categoryTitle || props?.category?.title)}`}
        >
          {cat.description}
        </p>
      ) : null}
    </Link>
  );
}
