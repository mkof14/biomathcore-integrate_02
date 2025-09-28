"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/member/dashboard", label: "Dashboard" },
  { href: "/member/health-assistant", label: "Health Assistant" },
  { href: "/member/health-blackbox", label: "Health Black Box" },
  { href: "/member/questionnaires", label: "Questionnaires" },
  { href: "/member/reports", label: "Reports" },
  { href: "/member/files", label: "Files" },
  { href: "/member/profile", label: "Profile" },
  { href: "/member/settings", label: "Settings" },
];

export default function SidebarNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {links.map(l => {
        const active = pathname === l.href || pathname?.startsWith(l.href + "/");
        return (
          <Link
            key={l.href}
            href={l.href}
            className={clsx(
              "px-3 py-2 rounded-lg text-sm",
              active ? "bg-gray-900 text-white" : "hover:bg-gray-100"
            )}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
