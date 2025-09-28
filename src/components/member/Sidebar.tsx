"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/member/dashboard", label: "Dashboard" },
  { href: "/member/profile", label: "Profile" },
  { href: "/member/catalog", label: "Catalog" },
  { href: "/member/reports", label: "Reports" },
  { href: "/member/health-blackbox", label: "Health Black Box" },
  { href: "/member/questionnaires", label: "Questionnaires" },
  { href: "/member/connect-devices", label: "Connect Devices" },
  { href: "/member/health-assistant", label: "Health Assistant" },
  { href: "/member/billing", label: "Billing" }
];

export default function MemberSidebar() {
  const pathname = usePathname();
  return (
    <aside className="min-h-screen bg-slate-900 text-slate-200 w-[240px] border-r border-slate-800 p-4">
      <div className="text-lg font-semibold mb-4 tracking-wide">Member Zone</div>
      <nav className="space-y-1 text-sm">
        {items.map((it) => {
          const active = pathname === it.href || pathname?.startsWith(it.href + "/");
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`block px-3 py-2 rounded ${active ? "bg-sky-500/20 text-sky-300" : "hover:bg-slate-800"}`}
            >
              {it.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
