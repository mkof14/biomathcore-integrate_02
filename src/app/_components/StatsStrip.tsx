"use client"
import React from "react"

type Stat = { value: string; labelTop: string; labelBottom?: string }

const stats: Stat[] = [
  { value: "200", labelTop: "AI-Powered Services" },
  { value: "3M+", labelTop: "Health Insights", labelBottom: "Generated" },
  { value: "98%", labelTop: "Accuracy Rate" },
  { value: "24/7", labelTop: "AI Health Assistant" },
]

export default function StatsStrip() {
  return (
    <section className="w-full py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.value + s.labelTop}
              className="group relative rounded-xl bg-white/5 border border-white/10 ring-1 ring-white/10 transition hover:ring-orange-700/50 hover:shadow-xl hover:shadow-orange-800/10"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-orange-800/70 to-transparent"></div>
              <div className="p-6 flex flex-col items-center text-center">
                <div className="mb-2 text-3xl font-bold tracking-tight text-orange-700 transition-transform duration-300 group-hover:scale-110 group-hover:text-orange-800">
                  {s.value}
                </div>
                <div className="text-sm sm:text-base text-slate-300 transition-colors duration-300 group-hover:text-slate-200">
                  {s.labelTop}{s.labelBottom ? <><br />{s.labelBottom}</> : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
