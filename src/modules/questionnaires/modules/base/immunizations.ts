import type { ModuleConfig } from "@/modules/questionnaires/types";
export function baseImmunizationsModule(): ModuleConfig {
  return {
    key: "base_immunizations",
    title: "Immunizations",
    description: "Recent vaccinations and boosters.",
    questions: [
      {
        id: "imm.covid",
        type: "select",
        label: "COVID-19 vaccination up to date?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "unsure", label: "Not sure" },
        ],
      },
      {
        id: "imm.tdap",
        type: "select",
        label: "Tdap (last 10 years)?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "unsure", label: "Not sure" },
        ],
      },
      {
        id: "imm.flu",
        type: "select",
        label: "Influenza (this season)?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      { id: "imm.notes", type: "textarea", label: "Notes" },
    ],
  };
}
