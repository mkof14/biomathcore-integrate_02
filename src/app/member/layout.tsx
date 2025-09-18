import "../globals.css";
import MemberSidebar from "@/components/member/Sidebar";

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr] bg-slate-100">
      <MemberSidebar />
      <main className="p-6">{children}</main>
    </div>
  );
}
