import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AuthMenu from "@/components/AuthMenu";

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="flex justify-between items-center p-4 border-b border-slate-800">
        <h1 className="text-xl font-semibold text-cyan-400">BioMath Core — Member Zone</h1>
        <AuthMenu email={session.user?.email || ""} />
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}