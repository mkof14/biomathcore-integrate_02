"use client";
import { memo } from "react";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { categoryColorFor } from "@/app/_components/CategoryVisual";
import Link from "next/link";

import { CATEGORIES } from "./services.catalog";
import { useFavorites } from "./useFavorites";
import { useAnalyticsEvent } from "./useAnalyticsEvent";

function ResultsGrid({ scopedTo }: { scopedTo?: string }) {
  const sendEvent = useAnalyticsEvent();
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

  const { category: _cat } = (useParams() as any) || {};
  const _svcSlug = scopedTo || _cat;

  const params = useSearchParams();
  const q = (params.get("q") || "").toLowerCase().trim();
  const tags = params.getAll("tag").map((t) => t.toLowerCase());
  const sort = params.get("sort") || "az";
  const { favs, toggle } = useFavorites();
  const { track } = useAnalyticsEvent();

  const categories = CATEGORIES.filter((c) =>
    scopedTo ? c.slug === scopedTo : true,
  );

  const matches = categories
    .map((c) => {
      let filtered = c.services.filter((s) => {
        const matchQ = q
          ? s.title.toLowerCase().includes(q) || s.slug.includes(q)
          : true;
        const matchTag =
          tags.length > 0
            ? tags.some(
                (t) =>
                  s.title.toLowerCase().includes(t) ||
                  c.title.toLowerCase().includes(t),
              )
            : true;
        return matchQ && matchTag;
      });
      if (sort === "az") {
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      }
      return { ...c, services: filtered };
    })
    .filter((c) => c.services.length > 0);

  const count = matches.reduce((acc, c) => acc + c.services.length, 0);

  if (matches.length === 0) {
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
                    : typeof favorites !== "undefined" &&
                        typeof props !== "undefined"
                      ? !!favorites?.has?.(
                          props?.slug ||
                            props?.service?.slug ||
                            props?.item?.slug,
                        )
                      : false;
    const [fav, setFav] = useState(!!isFav);
    useEffect(() => setFav(!!isFav), [isFav]);
    return (
      <div className={`text-sm text-slate-500 ${categoryColorFor(_svcSlug)}`}>
        No results
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${categoryColorFor(_svcSlug)}`}>
      <div
        className={`text-sm text-slate-600 dark:text-slate-300/90 ${categoryColorFor(_svcSlug)}`}
      >
        Results:{" "}
        <span className={`font-medium ${categoryColorFor(_svcSlug)}`}>
          {count}
        </span>
        {favs.length > 0 && (
          <span>
            {" "}
            • Favorites:{" "}
            <span className={`font-medium ${categoryColorFor(_svcSlug)}`}>
              {favs.length}
            </span>
          </span>
        )}
      </div>
      {matches.map((c) => (
        <section key={c.slug}>
          {!scopedTo ? (
            <header className={`mb-3 ${categoryColorFor(_svcSlug)}`}>
              <h2
                className={`text-lg font-semibold ${categoryColorFor(_svcSlug)} ${__catCls}`}
              >
                <Link
                  href={`/services/${c.slug}`}
                  className={`hover:underline ${categoryColorFor(_svcSlug)}`}
                  onClick={() =>
                    track({
                      type: "category_click",
                      meta: { category: c.slug, from: "results_header" },
                    })
                  }
                >
                  <span className={`${__catCls}`}>
                    <span className={`${__catCls}`}>
                      <span className={`${__catCls}`}>{c.title}</span>
                    </span>
                  </span>
                </Link>
              </h2>
            </header>
          ) : null}
          <div
            className={`grid motion-safe:animate-bmc-fade-in gap-4 sm:grid-cols-2 lg:grid-cols-3 ${categoryColorFor(_svcSlug)}`}
          >
            {c.services.map((s) => (
              <div
                key={s.slug}
                className={`relative group rounded-3xl border border-slate-200/50 bg-gradient-to-br from-white/95 to-white/75 dark:from-slate-900/70 dark:to-slate-900/40 backdrop-blur-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ${categoryColorFor(_svcSlug)}`}
              >
                <Link
                  href={`/svc/${s.slug}`}
                  className={`block rounded-3xl p-5 ${categoryColorFor(_svcSlug)}`}
                  onClick={() =>
                    track({
                      type: "service_click",
                      meta: { service: s.slug, category: c.slug },
                    })
                  }
                >
                  <h3 className="{`{`{`{`{`{`{`{`${`text-lg font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 dark:from-sky-400 dark:via-cyan-300 dark:to-teal-300 drop-shadow-sm ${categoryColorFor(_svcSlug)?.categorySlug||(item as any)?.category||(props as any)?.category?.slug||(props as any)?.categorySlug,(item as any)?.categoryTitle||(props as any)?.category?.title)}`} ${__catCls}`} ${__catCls}`} ${__catCls}`} ${__catCls}`} ${__catCls}`} ${__catCls}`} ${__catCls}`} ${__catCls}`}">
                    <span className={`${__catCls}`}>
                      <span className={`${__catCls}`}>
                        <span className={`${__catCls}`}>
                          <span className={`${__catCls}`}>
                            <span className={`${__catCls}`}>
                              <span className={`${__catCls}`}>{s.title}</span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </h3>
                  <p
                    className={`mt-2 text-xs text-slate-500 dark:text-slate-400 ${categoryColorFor(_svcSlug)}`}
                  >
                    <span className="details-accent">Details</span>
                  </p>
                </Link>
                <button
                  onClick={() => {
                    toggle(s.slug);
                    track({
                      type: "favorite_toggle",
                      meta: { service: s.slug, active: !favs.includes(s.slug) },
                    });
                  }}
                  className={`absolute top-3 right-3 h-6 w-6 inline-flex items-center justify-center rounded-full border border-slate-200/60 bg-white/90 dark:bg-slate-900/50 text-lg shadow-sm ${favs.includes(s.slug) ? "text-amber-500" : "text-slate-400 group-hover:text-slate-600"} ${categoryColorFor(_svcSlug)}`}
                  title="Toggle favorite"
                >
                  ★
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default memo(ResultsGrid);
