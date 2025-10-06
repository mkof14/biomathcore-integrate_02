import { CategoryTitle } from "@/app/_components/CategoryVisual";
("use client");
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "./services.catalog";

export default function CategoriesNav() {
  const pathname = usePathname();
  return (
    <aside className="w-64 shrink-0 border-r border-slate-200/60 pr-4">
      <div className="text-xs uppercase tracking-wide text-slate-500 mb-3">
        Categories
      </div>
      <nav className="space-y-1">
        <Link
          href="/services"
          className={`block rounded-md px-3 py-2 text-sm ${pathname === "/services" ? "bg-slate-100 dark:bg-slate-800/40 font-semibold" : "hover:bg-slate-50 dark:hover:bg-slate-800/30"}`}
        >
          All Services
        </Link>
        {CATEGORIES.map((c) => {
          const active = pathname === `/services/${c.slug}`;
          return (
            <Link
              key={c.slug}
              href={`/services/${c.slug}`}
              className={`block rounded-md px-3 py-2 text-sm ${active ? "bg-slate-100 dark:bg-slate-800/40 font-semibold" : "hover:bg-slate-50 dark:hover:bg-slate-800/30"}`}
            >
              <CategoryTitle cat={c} />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
