export const CATEGORY_COLOR: Record<string, string> = {
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
  "senior-care": "cat-senior-care",
  default: "cat-default",
};

export function categoryColorFor(slug?: string, title?: string) {
  if (slug === "family-health") return "cat-family-health";
  if (slug === "digital-therapeutics-store")
    return "cat-digital-therapeutics-store";
  if (slug && CATEGORY_COLOR[slug]) return CATEGORY_COLOR[slug];
  const t = (title ?? "").toLowerCase();
  if (t.includes("critical")) return CATEGORY_COLOR["critical-health"];
  if (t.includes("senior")) return CATEGORY_COLOR["senior-care"];
  if (t.includes("women")) return CATEGORY_COLOR["women-health"];
  if (t.includes("men")) return CATEGORY_COLOR["mens-health"];
  if (t.includes("mental")) return CATEGORY_COLOR["mental-wellness"];
  if (t.includes("sleep")) return CATEGORY_COLOR["sleep-health"];
  if (t.includes("nutrition") || t.includes("diet"))
    return CATEGORY_COLOR["nutrition-and-diet"];
  if (t.includes("everyday")) return CATEGORY_COLOR["everyday-wellness"];
  if (t.includes("metabolic")) return CATEGORY_COLOR["metabolic-health"];
  if (t.includes("cardio")) return CATEGORY_COLOR["cardio-health"];
  if (t.includes("lab")) return CATEGORY_COLOR["lab-diagnostics"];
  if (t.includes("vaccine") || t.includes("vaccination"))
    return CATEGORY_COLOR["vaccinations"];
  if (t.includes("fitness") || t.includes("performance"))
    return CATEGORY_COLOR["fitness-performance"];
  if (t.includes("longevity") || t.includes("aging"))
    return CATEGORY_COLOR["longevity-and-anti-aging"];
  if (t.includes("skin") || t.includes("dermatology"))
    return CATEGORY_COLOR["skin-dermatology"];
  if (t.includes("eye")) return CATEGORY_COLOR["eye-health-suite"];
  return CATEGORY_COLOR.default;
}

export function CategoryTitle({
  cat,
}: {
  cat: { slug?: string; title: string };
}) {
  const color = categoryColorFor(cat?.slug, cat?.title);
  return <span className={color}>{cat.title}</span>;
}
