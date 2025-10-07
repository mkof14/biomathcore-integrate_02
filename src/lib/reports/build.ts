import { validateReport, type TReportDocument } from "./schema";
export function buildReport(input: unknown): TReportDocument {
  const doc = validateReport(input);
  return doc;
}
