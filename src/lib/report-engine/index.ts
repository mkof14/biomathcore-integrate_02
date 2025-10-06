import {
  ReportInputSchema,
  ReportResultSchema,
  type ReportInput,
} from "@/lib/report-engine/contracts/reportSchemas";

export async function runReport(
  input: unknown,
  impl: (
    i: ReportInput,
  ) => Promise<{ title: string; lines: string[]; meta?: any }>,
) {
  const parsed = ReportInputSchema.parse(input);
  const result = await impl(parsed);
  return ReportResultSchema.parse(result);
}
