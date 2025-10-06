"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "./services.catalog";

export default function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        className="mb-4 rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm"
        aria-label="Open categories"
      >
        Categories
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-0 left-0 h-full w-80 bg-white dark:bg-slate-900 shadow-lg p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Categories
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-sm px-2 py-1 border rounded-md"
              >
                Close
              </button>
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
                    {c.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
