"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/member-zone", label: "Overview" },
  { href: "/member-zone/documents", label: "Documents" },
  { href: "/member-zone/questionnaires", label: "Questionnaires" },
  { href: "/member-zone/reports", label: "Reports" },
  { href: "/member-zone/profiles", label: "Profiles" },
  { href: "/member-zone/categories", label: "Categories" },
  { href: "/member-zone/analytics", label: "Analytics" },
  { href: "/member-zone/integrations", label: "Integrations" },
  { href: "/member-zone/settings", label: "Settings" },
  { href: "/member-zone/admin", label: "Admin" },
  { href: "/member-zone/control-center", label: "Control Center" },
];

export default function SidebarNav() {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {nav.map((i) => {
        const active = pathname === i.href;
        return (
          <Link
            key={i.href}
            href={i.href}
            className={`block rounded-lg px-3 py-2 text-sm font-medium ${
              active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}
