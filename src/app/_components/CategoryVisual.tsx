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
  "critical-health": "text-rose-400 dark:text-rose-300",
  "everyday-wellness": "text-emerald-400 dark:text-emerald-300",
  "longevity-and-anti-aging": "text-teal-400 dark:text-teal-300",
  "preventive-medicine-and-longevity": "text-teal-400 dark:text-teal-300",
  "mental-wellness": "text-indigo-400 dark:text-indigo-300",
  "sleep-and-recovery": "text-sky-400 dark:text-sky-300",
  "sleep-health": "text-sky-400 dark:text-sky-300",
  "fitness-and-performance": "text-violet-400 dark:text-violet-300",
  "biohacking-and-performance": "text-violet-400 dark:text-violet-300",
  "womens-health": "text-pink-400 dark:text-pink-300",
  "womens-sexual-health": "text-pink-400 dark:text-pink-300",
  "mens-health": "text-blue-400 dark:text-blue-300",
  "mens-sexual-health": "text-blue-400 dark:text-blue-300",
  "beauty-and-skincare": "text-fuchsia-400 dark:text-fuchsia-300",
  "nutrition-and-diet": "text-amber-400 dark:text-amber-300",
  "environmental-health": "text-lime-400 dark:text-lime-300",
  "family-health": "text-cyan-400 dark:text-cyan-300",
  "senior-care": "text-orange-400 dark:text-orange-300",
  "eye-health-suite": "text-sky-400 dark:text-sky-300",
  "digital-therapeutics-store": "text-purple-400 dark:text-purple-300",
  "general-sexual-longevity": "text-teal-400 dark:text-teal-300",
  "cardio-health": "text-red-400 dark:text-red-300",
  "lab-diagnostics": "text-fuchsia-400 dark:text-fuchsia-300",
  vaccinations: "text-cyan-400 dark:text-cyan-300",
  default: "text-slate-300 dark:text-slate-300",
};

export function CategoryTitle({
  cat,
}: {
  cat: { slug?: string; title: string };
}) {
  const slug = cat?.slug || "";
  const Icon = (CATEGORY_ICON as any)[slug] ?? CATEGORY_ICON.default;
  const color = categoryColorFor(slug, cat?.title);
  return (
    <span className="inline-flex items-center gap-2">
      <Icon className={`h-4 w-4 ${color}`} />
      <span className={`${color}`}>{cat.title}</span>
    </span>
  );
}

export function categoryColorFor(slug?: string, title?: string) {
  const sKey = (slug || "").toLowerCase();
  if (CATEGORY_COLOR[sKey]) return CATEGORY_COLOR[sKey];
  const t = (title || "").toLowerCase();
  if (/critical/.test(t)) return CATEGORY_COLOR["critical-health"];
  if (/everyday|daily|wellness/.test(t))
    return CATEGORY_COLOR["everyday-wellness"];
  if (/longevity|anti-?aging|sexual longevity/.test(t))
    return CATEGORY_COLOR["longevity-and-anti-aging"];
  if (/preventive/.test(t))
    return CATEGORY_COLOR["preventive-medicine-and-longevity"];
  if (/mental|mind|psych/.test(t)) return CATEGORY_COLOR["mental-wellness"];
  if (/sleep|recovery/.test(t)) return CATEGORY_COLOR["sleep-health"];
  if (/fitness|performance|biohacking/.test(t))
    return CATEGORY_COLOR["fitness-and-performance"];
  if (/women/.test(t)) return CATEGORY_COLOR["womens-health"];
  if (/men/.test(t)) return CATEGORY_COLOR["mens-health"];
  if (/beauty|skin/.test(t)) return CATEGORY_COLOR["beauty-and-skincare"];
  if (/nutrition|diet/.test(t)) return CATEGORY_COLOR["nutrition-and-diet"];
  if (/environment/.test(t)) return CATEGORY_COLOR["environmental-health"];
  if (/family/.test(t)) return CATEGORY_COLOR["family-health"];
  if (/senior|aging care/.test(t)) return CATEGORY_COLOR["senior-care"];
  if (/eye/.test(t)) return CATEGORY_COLOR["eye-health-suite"];
  if (/digital.*therapeutic/.test(t))
    return CATEGORY_COLOR["digital-therapeutics-store"];
  if (/lab|diagnostic/.test(t)) return CATEGORY_COLOR["lab-diagnostics"];
  if (/vaccin/.test(t)) return CATEGORY_COLOR["vaccinations"];
  return CATEGORY_COLOR.default;
}

export function categoryClassFor(slug?: string) {
  const map: Record<string, string> = {
    "critical-health": "cat-critical-health",
    "eye-health-suite": "cat-eye-health-suite",
    "women-health": "cat-women-health",
    "mens-health": "cat-mens-health",
    "mental-wellness": "cat-mental-wellness",
    "sleep-health": "cat-sleep-health",
    "nutrition-and-diet": "cat-nutrition-and-diet",
    "everyday-wellness": "cat-everyday-wellness",
    "metabolic-health": "cat-metabolic-health",
    "cardio-health": "cat-cardio-health",
    "lab-diagnostics": "cat-lab-diagnostics",
    vaccinations: "cat-vaccinations",
    "fitness-performance": "cat-fitness-performance",
    "longevity-and-anti-aging": "cat-longevity-and-anti-aging",
    "skin-dermatology": "cat-skin-dermatology",
  };
  return map[slug || ""] || "cat-default";
}
