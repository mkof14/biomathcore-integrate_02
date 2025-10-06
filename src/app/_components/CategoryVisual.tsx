import {
  Brain,
  FlaskConical,
  Shield,
  Sun,
  Dumbbell,
  Stethoscope,
  HeartPulse,
  Microscope,
  Syringe,
  Activity,
  Apple,
  Moon,
} from "lucide-react";

export const CATEGORY_ICON: Record<string, any> = {
  "longevity-and-anti-aging": FlaskConical,
  "mental-wellness": Brain,
  "critical-health": Shield,
  "mens-health": Dumbbell,
  "everyday-wellness": Sun,
  "sleep-health": Moon,
  "metabolic-health": Apple,
  "cardio-health": HeartPulse,
  "lab-diagnostics": Microscope,
  vaccinations: Syringe,
  "fitness-performance": Activity,
  default: Stethoscope,
};

export const CATEGORY_COLOR: Record<string, string> = {
  "longevity-and-anti-aging": "text-teal-500 dark:text-teal-300",
  "mental-wellness": "text-indigo-600 dark:text-indigo-300",
  "critical-health": "text-rose-600 dark:text-rose-300",
  "mens-health": "text-blue-600 dark:text-blue-300",
  "everyday-wellness": "text-emerald-600 dark:text-emerald-300",
  "sleep-health": "text-sky-600 dark:text-sky-300",
  "metabolic-health": "text-amber-600 dark:text-amber-300",
  "cardio-health": "text-red-600 dark:text-red-300",
  "lab-diagnostics": "text-fuchsia-600 dark:text-fuchsia-300",
  vaccinations: "text-cyan-600 dark:text-cyan-300",
  "fitness-performance": "text-violet-600 dark:text-violet-300",
  default: "text-slate-500 dark:text-slate-300",
};

export function CategoryTitle({
  cat,
}: {
  cat: { slug?: string; title: string };
}) {
  const slug = cat?.slug || "";
  const Icon = (CATEGORY_ICON as any)[slug] ?? CATEGORY_ICON.default;
  const color = (CATEGORY_COLOR as any)[slug] ?? CATEGORY_COLOR.default;
  return (
    <span className="inline-flex items-center gap-2">
      <Icon className={`h-4 w-4 ${color}`} />
      <span className={`${color}`}>{cat.title}</span>
    </span>
  );
}
