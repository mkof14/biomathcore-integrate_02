import type { ModuleConfig } from "@/modules/questionnaires/types";
export function baseCareTeamModule(): ModuleConfig {
  return {
    key: "base_care_team",
    title: "Care team",
    description: "Your primary care and specialists.",
    questions: [
      {
        id: "ct.pcp",
        type: "text",
        label: "Primary care physician",
        placeholder: "Name / Clinic",
      },
      {
        id: "ct.specialists",
        type: "textarea",
        label: "Specialists",
        placeholder: "e.g. cardiologist — Dr. Smith; endocrinologist — Dr. Lee",
      },
      {
        id: "ct.next_appt",
        type: "text",
        label: "Next appointment (YYYY-MM-DD)",
        placeholder: "e.g. 2025-10-02",
      },
    ],
  };
}
