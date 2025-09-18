import type { ModuleConfig } from "@/modules/questionnaires/types";
export function mentalHealthModule(): ModuleConfig {
  return { key: "mental_health", title: "Mental health", questions: [
    { id: "mh.mood", type: "select", label: "How is your mood most days?",
      options: [{ value: "good", label: "Good" }, { value: "ok", label: "OK" }, { value: "low", label: "Low" }] }
  ] };
}
