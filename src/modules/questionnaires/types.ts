export type Question =
  | {
      id: string;
      type: "text" | "textarea";
      label: string;
      required?: boolean;
      placeholder?: string;
      help?: string;
      validate?: { pattern: string; message: string };
      validators?: any[];
      requiredIf?: { when: string; is: string[] };
      visibleIf?: { when: string; is: string[] };
    }
  | {
      id: string;
      type: "select";
      label: string;
      required?: boolean;
      options: { value: string; label: string }[];
      help?: string;
      validators?: any[];
      requiredIf?: { when: string; is: string[] };
      visibleIf?: { when: string; is: string[] };
    };

export type ModuleConfig = {
  key: string;
  title: string;
  description?: string;
  requiresPrivacyConsent?: boolean;
  questions: Question[];
};

export type Plan = "STANDARD" | "PREMIUM" | "MAX";
