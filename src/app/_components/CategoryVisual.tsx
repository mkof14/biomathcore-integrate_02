"use client";
import * as React from "react";
import {
  Stethoscope,
  HeartPulse,
  Brain,
  Dumbbell,
  Venus,
  Male,
  Sparkles,
  UtensilsCrossed,
  Moon,
  Leaf,
  Users,
  ShieldCheck,
  FlaskConical,
  Activity,
  Eye,
  Store,
} from "lucide-react";

export const CATEGORY_ICON: Record<string, React.ComponentType<any>> = {
  "critical-health": Stethoscope,
  "everyday-wellness": Activity,
  "longevity-and-anti-aging": HeartPulse,
  "mental-wellness": Brain,
  "fitness-and-performance": Dumbbell,
  "womens-health": Venus,
  "mens-health": Male,
  "beauty-and-skincare": Sparkles,
  "nutrition-and-diet": UtensilsCrossed,
  "sleep-and-recovery": Moon,
  "environmental-health": Leaf,
  "family-health": Users,
  "preventive-medicine-and-longevity": ShieldCheck,
  "biohacking-and-performance": FlaskConical,
  "senior-care": Store,
  "eye-health-suite": Eye,
  "digital-therapeutics-store": Store,
  "general-sexual-longevity": HeartPulse,
  "mens-sexual-health": Male,
  "womens-sexual-health": Venus,
};

export const CATEGORY_COLOR: Record<string, string> = {
  "critical-health": "text-sky-300",
  "everyday-wellness": "text-cyan-300",
  "longevity-and-anti-aging": "text-indigo-300",
  "mental-wellness": "text-violet-300",
  "fitness-and-performance": "text-emerald-300",
  "womens-health": "text-rose-300",
  "mens-health": "text-blue-300",
  "beauty-and-skincare": "text-fuchsia-300",
  "nutrition-and-diet": "text-amber-300",
  "sleep-and-recovery": "text-indigo-200",
  "environmental-health": "text-green-300",
  "family-health": "text-teal-300",
  "preventive-medicine-and-longevity": "text-sky-300",
  "biohacking-and-performance": "text-purple-300",
  "senior-care": "text-slate-300",
  "eye-health-suite": "text-cyan-300",
  "digital-therapeutics-store": "text-amber-300",
  "general-sexual-longevity": "text-pink-300",
  "mens-sexual-health": "text-blue-300",
  "womens-sexual-health": "text-rose-300",
};

export function CategoryTitle({
  slug,
  children,
  className = "",
}: {
  slug: string;
  children: React.ReactNode;
  className?: string;
}) {
  const Icon = CATEGORY_ICON[slug] ?? Stethoscope;
  const color = CATEGORY_COLOR[slug] ?? "text-sky-300";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        className={`rounded-xl bg-slate-900/60 p-2 ring-1 ring-slate-700/60 ${color}`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="font-semibold text-slate-100">{children}</span>
    </div>
  );
}

export function CategoryTitle({ cat }: { cat: any }) {
  const slug = cat?.slug || "";
  const Color = (CATEGORY_COLOR as any)[slug] || "text-slate-700";
  const Icon = (CATEGORY_ICON as any)[slug];
  return (
    <span className="inline-flex items-center gap-2">
      {Icon ? <Icon className={"h-4 w-4 " + Color} /> : null}
      <span className={Color}>{cat?.title ?? String(slug)}</span>
    </span>
  );
}
