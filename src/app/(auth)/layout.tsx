import type { Metadata } from "next";

export const metadata: Metadata = { title: "BioMath Core — Auth" };

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-md px-4">{children}</div>
    </div>
  );
}
