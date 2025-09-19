import { ReportInputSchema, ReportResultSchema, type ReportInput, type ReportResult } from "@/lib/report-engine/contracts/reportSchemas";

export async function runReport(input: unknown, impl: (i: ReportInput) => Promise<ReportResult>): Promise<ReportResult> {
  const parsed = ReportInputSchema.parse(input);
  const result = await impl(parsed);
  return ReportResultSchema.parse(result);
}
