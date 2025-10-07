import type { ModuleConfig } from "@/modules/questionnaires/types";
export function baseFamilyHistoryModule(): ModuleConfig {
  return {
    key: "base_family_history",
    title: "Family history",
    description: "Health history of first-degree relatives.",
    questions: [
      {
        id: "fh.parents",
        type: "textarea",
        label: "Parents",
        placeholder: "e.g. mother — HTN; father — MI at 58",
      },
      {
        id: "fh.siblings",
        type: "textarea",
        label: "Siblings",
        placeholder: "e.g. sister — thyroid disease",
      },
      {
        id: "fh.early_cvd",
        type: "select",
        label: "Early cardiovascular disease (<55M/<65F)?",
        options: [
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ],
      },
    ],
  };
}
