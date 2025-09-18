import type { ModuleConfig } from "@/modules/questionnaires/types";
export function baseConsentsModule(): ModuleConfig {
  return {
    key: "base_consents",
    title: "Consents & Preferences",
    description: "Privacy and communication preferences.",
    questions: [
      { id: "base.consents.privacy", type: "select", label: "Consent to store and process health info for care optimization?", required: true,
        options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
      { id: "base.consents.communication", type: "select", label: "Preferred communication for updates", required: true,
        options: [
          { value: "email", label: "Email" },
          { value: "sms", label: "SMS" },
          { value: "phone", label: "Phone call" },
          { value: "both", label: "Both (email & phone)" }
        ] },
      { id: "base.consents.reminders", type: "select", label: "Consent to receive reminders", required: true,
        options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] }
    ],
  };
}
