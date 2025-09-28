export type QType = "text" | "number" | "textarea" | "boolean" | "select";
export type MetricSystem = "metric" | "imperial";
export type Answers = Record<string, string | number | boolean | undefined>;

export interface QuestionBase { id: string; label: string; type: QType; required?: boolean; placeholder?: string; }
export interface NumberQuestion extends QuestionBase { type: "number"; min?: number; max?: number; step?: number; unitMetric?: string; unitImperial?: string; }
export interface TextQuestion extends QuestionBase { type: "text" | "textarea"; rows?: number; }
export interface BooleanQuestion extends QuestionBase { type: "boolean"; }
export interface SelectQuestion extends QuestionBase { type: "select"; options: {value: string; label: string}[]; }
export type Question = NumberQuestion | TextQuestion | BooleanQuestion | SelectQuestion;

const STORAGE_PREFIX = "bmc:questionnaires";
const ENTITLE_PREFIX = "bmc:entitlements";
const USER_ID_KEY    = "bmc:userId";
const SUPERADMIN_KEY = "bmc:superadmin";

export function storageKey(slug: string) { return `${STORAGE_PREFIX}:${slug}`; }
export function entitlementKey(key: string) { return `${ENTITLE_PREFIX}:${key}`; }

/* ===== Super Admin ===== */
export function setSuperAdmin(on: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SUPERADMIN_KEY, on ? "true" : "false");
}
export function isSuperAdmin(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get("super") === "1") return true;
  } catch {}
  return localStorage.getItem(SUPERADMIN_KEY) === "true";
}

/* ===== Persistence ===== */
export function saveAnswers(slug: string, answers: Answers) {
  if (typeof window === "undefined") return;
  localStorage.setItem(storageKey(slug), JSON.stringify(answers));
}
export function loadAnswers(slug: string): Answers {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(storageKey(slug));
  try { return raw ? (JSON.parse(raw) as Answers) : {}; } catch { return {}; }
}
export function getAllAnswers(): Record<string, Answers> {
  if (typeof window === "undefined") return {};
  const out: Record<string, Answers> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)!;
    if (k.startsWith(STORAGE_PREFIX + ":")) {
      const slug = k.split(":").pop()!;
      try { out[slug] = JSON.parse(localStorage.getItem(k) || "{}"); } catch {}
    }
  }
  return out;
}
export function getUserId(): string {
  if (typeof window === "undefined") return "anon";
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) { id = "U" + Math.random().toString(36).slice(2, 10).toUpperCase(); localStorage.setItem(USER_ID_KEY, id); }
  return id;
}

/* ===== Entitlements ===== */
export function hasEntitlement(key: "sexual-health"): boolean {
  if (isSuperAdmin()) return true;
  if (typeof window === "undefined") return false;
  return localStorage.getItem(entitlementKey(key)) === "true";
}
export function grantEntitlement(key: "sexual-health", on: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(entitlementKey(key), on ? "true" : "false");
}
export function isSensitive(slug: string): boolean {
  return slug.startsWith("sexual-health");
}

/* ===== Schemas (включая Sexual Health расширенный) ===== */
const SCHEMAS: Record<string, Question[]> = {
  "patient": [
    { id: "firstName", label: "First name", type: "text", required: true, placeholder: "John" },
    { id: "lastName", label: "Last name", type: "text", required: true, placeholder: "Doe" },
    { id: "age", label: "Age", type: "number", required: true, min: 0, max: 120, step: 1 },
    { id: "height", label: "Height", type: "number", required: true, min: 40, max: 250, step: 0.1, unitMetric: "cm", unitImperial: "in" },
    { id: "weight", label: "Weight", type: "number", required: true, min: 2, max: 400, step: 0.1, unitMetric: "kg", unitImperial: "lb" },
    { id: "symptoms", label: "Main symptoms / concerns", type: "textarea", rows: 5, placeholder: "Describe key symptoms…" },
    { id: "meds", label: "Current medications & supplements", type: "textarea", rows: 4, placeholder: "Name, dosage, frequency…" },
    { id: "allergies", label: "Known allergies", type: "textarea", rows: 3, placeholder: "Drugs, foods, environmental…" },
    { id: "consent", label: "I consent to processing my wellness data.", type: "boolean", required: true }
  ],
  "lifestyle": [
    { id: "smoking", label: "Do you smoke?", type: "boolean", required: true },
    { id: "alcohol", label: "Alcohol drinks per week", type: "number", min: 0, max: 50, step: 1 },
    { id: "activity", label: "Physical activity (min/week)", type: "number", min: 0, max: 2000, step: 10 },
    { id: "diet", label: "Diet description", type: "textarea", rows: 4, placeholder: "Typical daily diet…" },
    { id: "sleep", label: "Average sleep (hours/night)", type: "number", min: 0, max: 14, step: 0.5, required: true }
  ],
  "medical-history": [
    { id: "chronic", label: "Chronic conditions", type: "textarea", rows: 4, placeholder: "e.g., hypertension, diabetes…" },
    { id: "surgeries", label: "Past surgeries", type: "textarea", rows: 4 },
    { id: "family", label: "Family history", type: "textarea", rows: 4 },
    { id: "vaccines", label: "Vaccinations up to date?", type: "boolean" },
    { id: "physician", label: "Primary care physician name", type: "text", placeholder: "Dr. Smith" }
  ],
  "sexual-health-general": [
    { id: "sexualActive", label: "Are you sexually active?", type: "boolean", required: true },
    { id: "protection", label: "Do you use protection consistently?", type: "boolean", required: true },
    { id: "partners12m", label: "Number of partners (last 12 months)", type: "number", min: 0, max: 50, step: 1 },
    { id: "nocturnalErectionsTrend", label: "Frequency of night/morning erections", type: "select", required: true, options: [
      { value: "decrease", label: "Decreased" }, { value: "same", label: "No change" }, { value: "increase", label: "Increased" }
    ]},
    { id: "sexualThoughtsTrend", label: "Frequency of sexual thoughts/fantasies", type: "select", required: true, options: [
      { value: "decrease", label: "Decreased" }, { value: "same", label: "No change" }, { value: "increase", label: "Increased" }
    ]},
    { id: "intercourseFrequencyTrend", label: "Frequency of sexual intercourse", type: "select", required: true, options: [
      { value: "decrease", label: "Decreased" }, { value: "same", label: "No change" }, { value: "increase", label: "Increased" }
    ]},
    { id: "stiHistory", label: "History of STIs (describe)", type: "textarea", rows: 4, placeholder: "If applicable, diagnosis and year…" },
    { id: "concerns", label: "Concerns or symptoms to discuss", type: "textarea", rows: 4, placeholder: "Pain, discharge, libido, etc." }
  ],
  "sexual-health-male": [
    { id: "erectileIssues", label: "Erectile difficulties?", type: "boolean" },
    { id: "ejaculationIssues", label: "Ejaculation issues (premature/retrograde)?", type: "boolean" },
    { id: "penilePain", label: "Penile/testicular pain?", type: "boolean" },
    { id: "discharge", label: "Urethral discharge?", type: "boolean" },
    { id: "libido", label: "Changes in libido?", type: "boolean" },
    { id: "muscleMassLoss", label: "Changes or loss of muscle mass", type: "boolean" },
    { id: "nocturnalErectionsTrend_m", label: "Night/morning erections — trend", type: "select", options: [
      { value: "decrease", label: "Decreased" }, { value: "same", label: "No change" }, { value: "increase", label: "Increased" }
    ]},
    { id: "notes", label: "Anything else to add", type: "textarea", rows: 4 }
  ],
  "sexual-health-female": [
    { id: "menstrualRegular", label: "Are cycles regular?", type: "boolean" },
    { id: "painIntercourse", label: "Pain during intercourse (dyspareunia)?", type: "boolean" },
    { id: "vaginalDischarge", label: "Unusual discharge?", type: "boolean" },
    { id: "contraception", label: "Current contraception", type: "select", options: [
      {value:"none", label:"None"}, {value:"condom", label:"Condom"}, {value:"ocp", label:"Oral contraceptive"},
      {value:"iud", label:"IUD"}, {value:"implant", label:"Implant"}, {value:"other", label:"Other"}
    ]},
    { id: "pregnant", label: "Currently pregnant?", type: "boolean" },
    { id: "muscleMassLoss_f", label: "Changes or loss of muscle mass", type: "boolean" },
    { id: "hairPresenceChanges", label: "Changes in presence of hair (legs, arms, breast, back, face)", type: "boolean" },
    { id: "hairDensityChanges", label: "Changes in hair density (legs, arms)", type: "boolean" },
    { id: "notes", label: "Anything else to add", type: "textarea", rows: 4 }
  ]
};

export function getSchema(slug: string) { return SCHEMAS[slug] || null; }

export async function submitQuestionnaire(slug: string, payload: { answers: Answers }) {
  const enriched: Answers = { ...payload.answers, _respondentId: getUserId(), _ts: Date.now() };
  saveAnswers(slug, enriched);
  return { ok: true };
}
