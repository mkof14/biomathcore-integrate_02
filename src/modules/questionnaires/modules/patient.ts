import type { ModuleConfig } from "@/modules/questionnaires/types";

/** Named export required by registry.ts */
export function patientModule(): ModuleConfig {
  return {
    key: "patient",
    title: "Patient Profile",
    questions: [
      {
        id: "pt.height_cm",
        type: "text",
        label: "Height (cm)",
        placeholder: "e.g. 178",
      },
      {
        id: "pt.weight_kg",
        type: "text",
        label: "Weight (kg)",
        placeholder: "e.g. 76",
      },
      {
        id: "pt.smoking",
        type: "select",
        label: "Do you smoke?",
        options: [
          { value: "never", label: "Never" },
          { value: "former", label: "Former" },
          { value: "current", label: "Current" },
        ],
      },
    ],
  };
}
