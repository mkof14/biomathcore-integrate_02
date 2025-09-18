"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/member/catalog",        label: "Catalog" },
  { href: "/member/questionnaires", label: "Questionnaires" },
  { href: "/member/orders",         label: "Orders" },
  { href: "/member/billing",        label: "Billing" },
  { href: "/member/settings",       label: "Settings" },
  { href: "/member/support",        label: "Support" },
];

export default function SidebarNav() {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {nav.map(item => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "block rounded-xl px-3 py-2 text-sm transition-all",
              active
                ? "bg-white/10 text-white border border-white/15"
                : "text-slate-200/80 hover:text-white hover:bg-white/5 border border-transparent"
            ].join(" ")}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
