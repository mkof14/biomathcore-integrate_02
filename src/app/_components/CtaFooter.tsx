"use client"
import Link from "next/link"
import { Rocket } from "lucide-react"

export default function CtaFooter() {
  return (
    <section className="mt-12 md:mt-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="group relative overflow-hidden rounded-2xl border border-[#6c3c22]/40 ring-1 ring-[#6c3c22]/10 bg-white/[0.04]">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#6c3c22] to-transparent opacity-50" />
          <div className="p-6 flex flex-col items-center text-center gap-4">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight" style={{ color: "#a8431f" }}>
              Ready to explore BioMath Core?
            </h3>
            <p className="text-slate-400/90 max-w-2xl">
              Unlock AI-powered wellness & longevity insights tailored to you.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/services" className="btn-nasa"><Rocket className="btn-nasa-icon" /> Explore Services</Link>
              <Link href="/signup" className="btn-nasa">Get Started</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
