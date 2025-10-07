export type Metric = { unit?: string; value?: number };
export function ensureMetric(m: any): Metric {
  if (!m || typeof m !== "object") return { unit: "n/a", value: 0 };
  const value = typeof m.value === "number" ? m.value : 0;
  const unit = typeof m.unit === "string" ? m.unit : "n/a";
  return { unit, value };
}
