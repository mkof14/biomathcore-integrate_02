"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Item({ href, children }: { href: string; children: React.ReactNode }) {
  const p = usePathname();
  const active = p === href || p.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={`block rounded-lg px-3 py-2 transition ${
        active
          ? "bg-sky-100 text-slate-900 font-medium"
          : "hover:bg-slate-100 text-slate-700"
      }`}
    >
      {children}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white">
      <div className="p-4 text-xl font-semibold">Member</div>
      <nav className="px-2 pb-6 space-y-1">
        <Item href="/member/dashboard">Dashboard</Item>
        <Item href="/member/questionnaires">Questionnaires</Item>
        <Item href="/member/reports">Reports</Item>
        <Item href="/member/files">Files</Item>
        <Item href="/member/catalog">Catalog</Item>
        <Item href="/member/health-assistant">Health Assistant</Item>
        <Item href="/member/health-blackbox">Health Blackbox</Item>
        <Item href="/member/connect-devices">Connect Devices</Item>
        <Item href="/member/orders">Orders</Item>
        <Item href="/member/billing">Billing</Item>
        <Item href="/member/profile">Profile</Item>
        <Item href="/member/settings">Settings</Item>
        <Item href="/member/support">Support</Item>
        <Item href="/member/admin">Admin</Item>
      </nav>
    </aside>
  );
}
