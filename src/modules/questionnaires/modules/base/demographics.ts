import type { ModuleConfig } from "@/modules/questionnaires/types";
export function baseDemographicsModule(): ModuleConfig {
  return {
    key: "base_demographics",
    title: "Basic demographics & contact",
    questions: [
      { id: "base.name.first", type: "text", label: "First name", required: true, placeholder: "John" },
      { id: "base.name.last",  type: "text", label: "Last name",  required: true, placeholder: "Doe" },

      { id: "base.consents.communication", type: "select", label: "Preferred communication", required: true,
        options: [
          { value: "email", label: "Email" },
          { value: "sms",   label: "SMS" },
          { value: "phone", label: "Phone call" },
          { value: "both",  label: "Both (email & phone)" }
        ]},

      { id: "base.contact.country", type: "select", label: "Country", required: true,
        options: [
          { value: "US", label: "United States" },
          { value: "CA", label: "Canada" },
          { value: "GB", label: "United Kingdom" },
          { value: "DE", label: "Germany" },
          { value: "FR", label: "France" },
          { value: "AU", label: "Australia" },
          { value: "NZ", label: "New Zealand" },
          { value: "IT", label: "Italy" },
          { value: "ES", label: "Spain" },
          { value: "NL", label: "Netherlands" }
        ]},

      { id: "base.contact.postal", type: "text", label: "Postal code", required: true, placeholder: "ZIP/Postal",
        validators: [{
          kind: "patternByCountry",
          countryField: "base.contact.country",
          patterns: {
            "US": "^[0-9]{5}(-[0-9]{4})?$",
            "CA": "^[A-Za-z]\\d[A-Za-z] ?\\d[A-Za-z]\\d$",
            "GB": "^(GIR 0AA|[A-Z]{1,2}\\d[A-Z\\d]? \\d[A-Z]{2})$",
            "DE": "^[0-9]{5}$", "FR": "^[0-9]{5}$", "AU": "^[0-9]{4}$", "NZ": "^[0-9]{4}$",
            "IT": "^[0-9]{5}$", "ES": "^[0-9]{5}$", "NL": "^[0-9]{4} ?[A-Za-z]{2}$"
          },
          defaultMessage: "Enter a valid postal code for your country"
        }]},

      { id: "base.contact.email", type: "text", label: "Email",
        requiredIf: { when: "base.consents.communication", is: ["email","both"] },
        placeholder: "name@example.com",
        validate: { pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message: "Enter a valid email address" },
        validators: [{ kind: "requireAnyFilled", fields: ["base.contact.email","base.contact.phone"], message: "Provide at least one contact: email or phone" }]
      },

      { id: "base.contact.phone", type: "text", label: "Phone",
        requiredIf: { when: "base.consents.communication", is: ["sms","phone","both"] },
        placeholder: "+1XXXXXXXXXX",
        validate: { pattern: "^[+()\\-\\s\\d]{7,}$", message: "Enter a valid phone number" },
        validators: [
          { kind: "patternByCountry", countryField: "base.contact.country",
            patterns: {
              "US": "^\\+?1\\d{10}$", "CA": "^\\+?1\\d{10}$",
              "GB": "^\\+?44\\d{9,10}$", "DE": "^\\+?49\\d{10,14}$",
              "FR": "^\\+?33\\d{9}$", "AU": "^\\+?61\\d{9}$",
              "NZ": "^\\+?64\\d{8,10}$", "IT": "^\\+?39\\d{9,11}$",
              "ES": "^\\+?34\\d{9}$", "NL": "^\\+?31\\d{9}$"
            },
            defaultMessage: "Use international format for your country (e.g. +1XXXXXXXXXX, +44XXXXXXXXXX)"
          },
          { kind: "requireAnyFilled", fields: ["base.contact.email","base.contact.phone"], message: "Provide at least one contact: email or phone" }
        ]
      },

      { id: "base.dob", type: "text", label: "Date of birth (YYYY-MM-DD)", required: true, placeholder: "1980-01-15",
        validate: { pattern: "^\\d{4}-\\d{2}-\\d{2}$", message: "Use format YYYY-MM-DD" },
        validators: [{ kind: "minAgeYears", years: 18, message: "You must be at least 18 years old" }]
      }
    ],
  };
}
