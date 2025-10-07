import type { ModuleConfig } from "@/modules/questionnaires/types";
export function baseSymptomsModule(): ModuleConfig {
  return {
    key: "base_symptoms",
    title: "Symptoms",
    description: "Current symptoms and duration.",
    questions: [
      {
        id: "sym.current",
        type: "textarea",
        label: "Current symptoms",
        placeholder: "e.g. chest discomfort on exertion; started ~2 months ago",
      },
      {
        id: "sym.duration",
        type: "text",
        label: "Duration",
        placeholder: "e.g. 2 months",
      },
      {
        id: "sym.severity",
        type: "select",
        label: "Severity",
        options: [
          { value: "mild", label: "Mild" },
          { value: "moderate", label: "Moderate" },
          { value: "severe", label: "Severe" },
        ],
      },
      {
        id: "sym.triggers",
        type: "text",
        label: "Triggers",
        placeholder: "e.g. exercise, stress, meals",
      },
    ],
  };
}
