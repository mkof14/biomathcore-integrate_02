export const QUESTIONNAIRE_ORDER = ["patient", "lifestyle", "medical-history"];
export function nextSlug(current: string) {
  const i = QUESTIONNAIRE_ORDER.indexOf(current);
  return i >= 0 && i < QUESTIONNAIRE_ORDER.length - 1
    ? QUESTIONNAIRE_ORDER[i + 1]
    : null;
}
export function firstSlug() {
  return QUESTIONNAIRE_ORDER[0];
}
