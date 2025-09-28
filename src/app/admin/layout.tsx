import "../globals.css";
import Image from "next/image";
import SidebarClient from "@/components/admin/SidebarClient";
import CommandPaletteClient from "@/components/admin/CommandPaletteClient";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-200 grid grid-cols-[260px_1fr]">
      <SidebarClient />
      <main className="p-6">
        <TopBar />
        <div className="mt-6">{children}</div>
      </main>
      <CommandPaletteClient />
    </div>
  );
}

function TopBar() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Image src="/BMCore-34.png" alt="BMCore" width={28} height={28} />
        <div className="text-xl font-semibold tracking-wide">Mission Control</div>
      </div>
      <div className="flex items-center gap-2">
        <input placeholder="Search (⌘/Ctrl+K)" className="px-3 py-1 rounded bg-slate-900/60 border border-slate-700 w-56" />
        <a href="/admin/alerts" className="px-3 py-1 rounded bg-rose-500 text-slate-900 font-semibold">Incidents</a>
        <a href="/admin/monitoring" className="px-3 py-1 rounded bg-emerald-400 text-slate-900 font-semibold">Status</a>
      </div>
    </div>
  );
}
