"use client"
import Link from "next/link"
import { Bot, Sparkles } from "lucide-react"

export default function PromoDualAI() {
  return (
    <section className="mt-6">
      <div className="group relative overflow-hidden rounded-2xl border border-white/10 ring-1 ring-white/10 bg-white/5">
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-orange-800/70 to-transparent" />
        <div className="flex flex-col gap-4 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-white/7 ring-1 ring-white/10">
              <Sparkles className="h-6 w-6 text-orange-700" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100">
                Second Opinion — Dual AI Reports
              </h3>
              <p className="mt-1 text-slate-300">
                Two independent AI analyses. One balanced, exportable plan.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/services" className="btn-nasa">
              <Bot className="btn-nasa-icon" />
              Explore Services
            </Link>
            <Link href="/services/critical-health" className="btn-nasa">
              See Example
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
