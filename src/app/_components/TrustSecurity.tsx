"use client"
import { ShieldCheck, Lock } from "lucide-react"

export default function TrustSecurity() {
  return (
    <section className="mt-10 md:mt-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="group relative overflow-hidden rounded-2xl border border-[#6c3c22]/30 ring-1 ring-[#6c3c22]/10 bg-white/[0.03]">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#6c3c22] to-transparent opacity-40" />
          <div className="p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-[#2a1b12]/40 ring-1 ring-[#6c3c22]/30 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-[#a8431f]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-300">Trust & Security</h3>
                <p className="mt-1 text-slate-400/90">
                  All analytics stay encrypted end-to-end.
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  AES-256 · Zero-Trust · HIPAA / SOC 2–grade practices
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-slate-400/80">
              <Lock className="h-4 w-4 text-[#a8431f]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
