"use client"
import { Upload, BrainCircuit, TrendingUp } from "lucide-react"

export default function HowItWorks() {
  return (
    <section className="mt-10 md:mt-12">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-6 text-2xl md:text-3xl font-semibold tracking-tight text-slate-200">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative rounded-2xl border border-[#6c3c22]/30 ring-1 ring-[#6c3c22]/10 bg-white/[0.02] p-5">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#6c3c22] to-transparent opacity-40" />
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-[#2a1b12]/40 ring-1 ring-[#6c3c22]/30 flex items-center justify-center">
                <Upload className="h-5 w-5 text-[#a8431f]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-300">Connect data</h3>
                <p className="mt-2 text-sm text-slate-400/90">Sync wearables, labs, and health records for a unified view.</p>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl border border-[#6c3c22]/30 ring-1 ring-[#6c3c22]/10 bg-white/[0.02] p-5">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#6c3c22] to-transparent opacity-40" />
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-[#2a1b12]/40 ring-1 ring-[#6c3c22]/30 flex items-center justify-center">
                <BrainCircuit className="h-5 w-5 text-[#a8431f]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-300">AI insights</h3>
                <p className="mt-2 text-sm text-slate-400/90">Advanced models surface risks and opportunities for longevity.</p>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl border border-[#6c3c22]/30 ring-1 ring-[#6c3c22]/10 bg-white/[0.02] p-5">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#6c3c22] to-transparent opacity-40" />
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-[#2a1b12]/40 ring-1 ring-[#6c3c22]/30 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-[#a8431f]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-300">Act & track</h3>
                <p className="mt-2 text-sm text-slate-400/90">Follow a personalized plan and monitor progress over time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
