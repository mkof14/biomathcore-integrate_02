import Link from "next/link";
import Image from "@/shims/NoImage";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-800/60 backdrop-blur h-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-sky-500/20 via-transparent to-emerald-500/20" />
      <div className="relative mx-auto max-w-7xl px-4 h-full flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/"
            alt="BioMath Core"
            width={80}
            height={80}
            className="h-20 w-20 rounded-xl"
            priority
          />
          <span className="flex items-baseline gap-1">
            <span className="text-3xl md:text-4xl font-semibold text-sky-400">
              BioMath
            </span>
            <span className="text-3xl md:text-4xl font-semibold text-white">
              Core
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-lg">
          <Link href="/" className="text-slate-200 hover:text-white">
            Home
          </Link>
          <Link href="/about" className="text-slate-200 hover:text-white">
            About
          </Link>
          <Link href="/services" className="text-slate-200 hover:text-white">
            Services
          </Link>
          <Link href="/pricing" className="text-slate-200 hover:text-white">
            Pricing
          </Link>
          <Link href="/member" className="text-slate-200 hover:text-white">
            Member
          </Link>
          <Link href="/investors" className="text-slate-200 hover:text-white">
            Investors
          </Link>
        </nav>

        <div className="flex items-center text-lg">
          <Link href="/sign-in" className="text-slate-200 hover:text-white">
            Sign In/Up
          </Link>
        </div>
      </div>
    </header>
  );
}
