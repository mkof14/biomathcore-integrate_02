"use client";
import Image from "next/image";

export default function AuthShell({
  title,
  subtitle,
  children,
  logoSrc = "/images/BMCore-Logo-33.png",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  logoSrc?: string;
}) {
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(1200px_800px_at_80%_-10%,#0ea5e933,transparent),linear-gradient(180deg,#020617,#0b1220_60%,#020617)] text-white">
      <div className="mx-auto max-w-md px-4 py-10">
        <div className="mb-8 flex items-center justify-center">
          <Image
            src={logoSrc}
            alt="BioMath Core"
            width={64}
            height={64}
            className="h-12 w-12 rounded-xl shadow"
            priority
          />
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <h1 className="mb-1 text-center text-2xl font-semibold">{title}</h1>
          {subtitle ? (
            <p className="mb-5 text-center text-sm text-slate-300">
              {subtitle}
            </p>
          ) : (
            <div className="mb-4" />
          )}
          {children}
        </div>
        <p className="mt-6 text-center text-xs text-slate-400">
          © BioMath Core {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
