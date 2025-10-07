import type { ModuleConfig } from "@/modules/questionnaires/types";
export function sexualHealthAdvancedModule(): ModuleConfig {
  return {
    key: "sexual_health_adv",
    title: "Sensitive: Sexual health",
    requiresPrivacyConsent: true,
    questions: [
      {
        id: "sh.consent",
        type: "select",
        label: "Include sexual health questions?",
        required: true,
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
    ],
  };
}
