"use client"
import Link from "next/link"
import { CATEGORIES } from "@/app/services/services.catalog"
import { CATEGORY_STYLES } from "@/lib/categoryStyles"

export default function HomeCategories() {
  return (
    <section className="w-full pt-6 sm:pt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {CATEGORIES.map((c) => {
            const slug = c.slug
            const cat = CATEGORY_STYLES[slug] ?? CATEGORY_STYLES["other"]
            return (
              <Link
                key={slug}
                href={`/services/${slug}`}
                className={`group relative rounded-xl border border-white/15 ring-1 ring-white/20 bg-white/5 transition ${cat.text} hover:shadow-[0_10px_30px_-10px_currentColor]`}
              >
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-70" />
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
