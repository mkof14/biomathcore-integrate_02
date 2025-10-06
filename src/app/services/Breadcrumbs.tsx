"use client";
import Link from "next/link";

export default function Breadcrumbs({
  items,
}: {
  items: { href?: string; label: string }[];
}) {
  return (
    <nav className="text-sm text-slate-600 mb-4">
      <ol className="flex items-center gap-2 flex-wrap">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {it.href ? (
              <Link href={it.href} className="hover:underline">
                {it.label}
              </Link>
            ) : (
              <span className="font-medium">{it.label}</span>
            )}
            {idx < items.length - 1 ? (
              <span className="opacity-50">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
