
import type { ModuleConfig } from "@/modules/questionnaires/types";

/** Named export required by registry.ts */
export function lifestyleModule(): ModuleConfig {
  return {
    key: "lifestyle",
    title: "Lifestyle",
    questions: [
      { id: "life.activity", type: "select", label: "Weekly physical activity",
        options: [
          { value: "low",  label: "< 75 min / week" },
          { value: "mod",  label: "75–150 min / week" },
          { value: "high", label: "> 150 min / week" }
        ] },
      { id: "life.alcohol", type: "select", label: "Alcohol use",
        options: [
          { value: "none",      label: "None" },
          { value: "moderate",  label: "Moderate" },
          { value: "high",      label: "High" }
        ] }
    ],
  };
}
