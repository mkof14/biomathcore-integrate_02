"use client";
import Link from "next/link";
import Image from "@/shims/NoImage";
import RoleGate from "@/components/admin/RoleGate";
import { useRole } from "@/components/admin/useRole";

export default function SidebarClient() {
  const { role } = useRole();
  return (
    <aside className="bg-[#0c1324] border-r border-slate-800 p-4">
      <div className="flex items-center gap-3 mb-6">
        <Image src="/BMCore-34.png" alt="BMCore" width={36} height={36} />
        <div className="font-semibold tracking-wide">BMCore Admin</div>
      </div>
      <nav className="space-y-1 text-sm">
        <AdminLink href="/admin/dashboard" label="Dashboard" />
        <RoleGate permission="monitoring">
          <AdminLink href="/admin/monitoring" label="Monitoring" />
        </RoleGate>
        <RoleGate permission="view_finance">
          <AdminLink href="/admin/finance" label="Finance Monitor" />
        </RoleGate>
        <RoleGate permission="manage_users">
          <AdminLink href="/admin/users" label="User Management" />
        </RoleGate>
        <RoleGate permission="monitor_devices">
          <AdminLink href="/admin/devices" label="Device Monitor" />
        </RoleGate>
        <RoleGate permission="view_analytics">
          <AdminLink href="/admin/behavior" label="Behavior Analytics" />
        </RoleGate>
        <RoleGate permission="view_alerts">
          <AdminLink href="/admin/alerts" label="Alerts" />
        </RoleGate>
        <RoleGate permission="access_settings">
          <AdminLink href="/admin/settings" label="Settings" />
        </RoleGate>
      </nav>
      <form
        className="mt-8"
        action="/admin/logout"
        method="post"
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch("/api/admin/logout", { method: "POST" });
          location.href = "/admin/login";
        }}
      >
        <button className="w-full py-2 rounded bg-slate-800 hover:bg-slate-700">
          Log out
        </button>
      </form>
      <div className="mt-4 text-xs text-slate-500">
        Role: <span className="text-slate-300">{role}</span>
      </div>
    </aside>
  );
}
function AdminLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="block px-3 py-2 rounded hover:bg-slate-800">
      {label}
    </Link>
  );
}
