import type { ModuleConfig } from "@/modules/questionnaires/types";
export function labsModule(): ModuleConfig {
  return { key: "labs", title: "Recent labs", questions: [
    { id: "labs.a1c", type: "text", label: "If known: A1c (%)", placeholder: "e.g. 5.6" }
  ] };
}
