"use client";
import Link from "next/link";
import { Rocket, Stars } from "lucide-react";
export default function HomeAdsBand() {
  return (
    <section className="mt-12 nasa-card p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="rounded-2xl bg-slate-900/70 p-3 ring-1 ring-slate-700/60 text-violet-300">
            <Rocket className="h-6 w-6" />
          </span>
          <div>
            <h3 className="nasa-title text-xl font-bold">
              AI Health with Two Opinions
            </h3>
            <p className="text-sm text-slate-400">
              Marketing-grade clarity. Evidence + Exploration. Export-ready.
            </p>
          </div>
        </div>
        <div className="md:ml-auto flex gap-2">
          <Link href="/services" className="nasa-cta cta-dark text-sm cta-dark">
            <Stars className="h-4 w-4" /> Discover Now
          </Link>
        </div>
      </div>
    </section>
  );
}
