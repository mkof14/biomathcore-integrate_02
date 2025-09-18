import type { ModuleConfig } from "@/modules/questionnaires/types";
export function baseVitalsLifestyleModule(): ModuleConfig {
  return {
    key: "base_vitals_lifestyle",
    title: "Vitals & lifestyle",
    description: "Anthropometrics and habits.",
    questions: [
      { id: "vl.height_cm", type: "text", label: "Height (cm)", placeholder: "e.g. 180" },
      { id: "vl.weight_kg", type: "text", label: "Weight (kg)", placeholder: "e.g. 78" },
      { id: "vl.bp",        type: "text", label: "Recent BP (mmHg)", placeholder: "e.g. 120/80" }
    ],
  };
}
