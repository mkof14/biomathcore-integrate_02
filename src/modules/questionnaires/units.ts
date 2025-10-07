export type UnitsMode = "metric" | "imperial";

export function kgToLb(kg: number) {
  return Math.round(kg * 2.20462 * 10) / 10;
}
export function lbToKg(lb: number) {
  return Math.round((lb / 2.20462) * 10) / 10;
}
export function cmToFeetInches(cm: number) {
  const inches = cm / 2.54;
  const ft = Math.floor(inches / 12);
  const inch = Math.round(inches - ft * 12);
  return { ft, inch };
}
export function feetInchesToCm(ft: number, inch: number) {
  return Math.round((ft * 12 + inch) * 2.54);
}

/** Меняем подписи/placeholder для рост/вес не трогая стиль. */
export function transformModulesForUnits(mods: any[], units: UnitsMode) {
  return mods.map((m) => {
    if (!Array.isArray(m.questions)) return m;
    const q = m.questions.map((q: any) => {
      if (q.id === "vl.height_cm" && units === "imperial") {
        return {
          ...q,
          id: "vl.height_ftin",
          label: "Height (ft/in)",
          placeholder: "e.g. 5 ft 11 in",
        };
      }
      if (q.id === "vl.weight_kg" && units === "imperial") {
        return {
          ...q,
          id: "vl.weight_lb",
          label: "Weight (lb)",
          placeholder: "e.g. 172",
        };
      }
      return q;
    });
    return { ...m, questions: q };
  });
}
