import type { ModuleConfig } from "@/modules/questionnaires/types";
export function cardiometabolicModule(): ModuleConfig {
  return { key: "cardiometabolic", title: "Cardiometabolic", questions: [
    { id: "cm.risk", type: "select", label: "Known cardiometabolic risk?",
      options: [{ value: "none", label: "None/unknown" }, { value: "low", label: "Low" }, { value: "high", label: "High" }] }
  ] };
}
