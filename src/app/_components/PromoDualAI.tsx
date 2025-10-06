"use client";
import { Scale } from "lucide-react";
import Link from "next/link";
export default function PromoDualAI() {
  return (
    <section className="mt-10 nasa-card p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="rounded-2xl bg-slate-900/70 p-3 ring-1 ring-slate-700/60 text-sky-300">
            <Scale className="h-6 w-6" />
          </span>
          <div>
            <h3 className="nasa-title text-xl font-bold">
              Second Opinion — Dual AI Reports
            </h3>
            <p className="text-sm text-slate-400">
              Two independent perspectives. One balanced, exportable plan.
            </p>
          </div>
        </div>
        <div className="md:ml-auto flex gap-2">
          <Link href="/services" className="nasa-cta text-sm">
            Explore Services
          </Link>
          <Link
            href="/svc/ai-medication-adherence"
            className="nasa-cta text-sm"
          >
            See Example
          </Link>
        </div>
      </div>
    </section>
  );
}
