import type { ModuleConfig } from "@/modules/questionnaires/types";
export function baseMedicalHistoryModule(): ModuleConfig {
  return {
    key: "base_medical_history",
    title: "Medical history",
    description: "Major diagnoses, surgeries, and conditions.",
    questions: [
      {
        id: "mh.conditions",
        type: "textarea",
        label: "Chronic conditions",
        placeholder: "e.g. hypertension (dx 2018), T2D (dx 2021), GERD…",
      },
      {
        id: "mh.surgeries",
        type: "textarea",
        label: "Past surgeries/procedures",
        placeholder: "e.g. appendectomy 2009; PCI 2022…",
      },
      {
        id: "mh.hospitalizations",
        type: "textarea",
        label: "Hospitalizations (reason & year)",
        placeholder: "e.g. pneumonia 2017; DKA 2022…",
      },
      {
        id: "mh.infections_covid",
        type: "select",
        label: "COVID-19 in past?",
        options: [
          { value: "never", label: "Never" },
          { value: "once", label: "Once" },
          { value: "multiple", label: "Multiple times" },
        ],
      },
      {
        id: "mh.vaccinated_covid",
        type: "select",
        label: "COVID vaccination",
        options: [
          { value: "up_to_date", label: "Up to date" },
          { value: "partial", label: "Partial" },
          { value: "none", label: "None" },
        ],
      },
    ],
  };
}
