import type { ModuleConfig } from "../../questionnaires/types";
export function sexualHealthModule(): ModuleConfig {
  return {
    key: "sexual_health",
    title: "Sexual Health",
    description: "Confidential questions to support clinical-quality insights.",
    questions: [
      {
        id: "sh.consent",
        type: "select",
        label: "Consent to share sexual health info for care optimization?",
        required: true,
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "sh.concerns",
        type: "text",
        label: "Main concerns (if any)",
        placeholder: "Optional",
      },
      {
        id: "sh.functionChange",
        type: "select",
        label: "Recent changes in sexual function or libido?",
        options: [
          { value: "none", label: "No significant change" },
          { value: "decrease", label: "Decrease" },
          { value: "increase", label: "Increase" },
          { value: "variable", label: "Variable" },
        ],
      },
      {
        id: "sh.painOrDiscomfort",
        type: "select",
        label: "Pain or discomfort during sexual activity?",
        options: [
          { value: "never", label: "Never" },
          { value: "sometimes", label: "Sometimes" },
          { value: "often", label: "Often" },
        ],
      },
      {
        id: "sh.stiHistory",
        type: "select",
        label: "History of STIs (clinician-diagnosed)?",
        options: [
          { value: "no", label: "No" },
          { value: "yes_past", label: "Yes, in the past" },
          { value: "yes_recent", label: "Yes, recently" },
          { value: "prefer_not", label: "Prefer not to say" },
        ],
      },
      {
        id: "sh.protection",
        type: "select",
        label: "Typical protection method(s)?",
        options: [
          { value: "none", label: "No protection" },
          { value: "condom", label: "Condom" },
          { value: "hormonal", label: "Hormonal" },
          { value: "barrier", label: "Barrier (non-condom)" },
          { value: "other", label: "Other" },
          { value: "prefer_not", label: "Prefer not to say" },
        ],
      },
    ],
  };
}
