"use client"
import { ShieldCheck, LineChart, Link2, ActivitySquare, Lightbulb, Layers } from "lucide-react"

const nasaOrange = "#a8431f" // darker orange similar to stats numbers

type Item = { icon: React.ElementType; title: string; body: string }
const items: Item[] = [
  {
    icon: Layers,
    title: "Personalization",
    body: "Your biology, your plan: tailored insights and recommendations that adapt to your data and context.",
  },
  {
    icon: LineChart,
    title: "Precision & Prediction",
    body: "Advanced computational models and AI support accurate predictions and guide better health decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Data Security",
    body: "AES-256 encryption, Zero-Trust architecture, and HIPAA/SOC 2 safeguards keep your information protected.",
  },
  {
    icon: Link2,
    title: "Comprehensive Integration",
    body: "Unify wearables, genetics, lab results, and medical records into one clear, actionable health picture.",
  },
  {
    icon: ActivitySquare,
    title: "Proactive Health Management",
    body: "Shift from reactive to proactive: early alerts, personalized prevention, and longevity planning to act before issues arise.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Innovation",
    body: "We evolve with science: integrating computational biology, AI, and medicine to keep you informed with rigorous updates.",
  },
]

export default function OurAdvantages() {
  return (
    <section className="mt-14 md:mt-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-8 text-3xl md:text-4xl font-semibold tracking-tight text-center" style={{ color: nasaOrange }}>
          Our Advantages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {items.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="relative rounded-2xl border bg-white/[0.02] p-5 md:p-6 transition hover:shadow-[0_8px_22px_-8px_rgba(168,67,31,0.3)]"
              style={{
                borderColor: `${nasaOrange}40`,
                boxShadow: `0 0 0 1px ${nasaOrange}20 inset`,
              }}
            >
              <div
                className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent to-transparent opacity-40"
                style={{ backgroundImage: `linear-gradient(to right, transparent, ${nasaOrange}, transparent)` }}
              />
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 h-11 w-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#2a1b12", border: `1px solid ${nasaOrange}50` }}
                >
                  <Icon className="h-5 w-5" style={{ color: nasaOrange }} />
                </div>
                <div>
                  <h3 className="text-base font-semibold" style={{ color: "#d1d1d1" }}>
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "#a0a0a0" }}>
                    {body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
