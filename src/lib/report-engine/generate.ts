import type {
  ReportInput,
  ReportResult,
} from "@/lib/report-engine/contracts/reportSchemas";

export async function generateReport(
  input: ReportInput,
): Promise<ReportResult> {
  const lines = [
    `Report for user ${input.userId}`,
    `Title: ${input.title}`,
    `Params: ${JSON.stringify(input.params ?? {})}`,
  ];
  return {
    id: `rep_${Date.now()}`,
    title: input.title,
    createdAt: new Date(),
    lines,
    meta: { kind: "demo" },
  };
}
