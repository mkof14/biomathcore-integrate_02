import type { ReportResult } from "@/lib/report-engine/contracts/reportSchemas";

export function aggregateReports(reports: ReportResult[]): ReportResult {
  const title = `Aggregate(${reports.length})`;
  const lines = reports.flatMap(r => r.lines);
  return {
    id: `agg_${Date.now()}`,
    title,
    createdAt: new Date(),
    lines,
    meta: { aggregated: reports.map(r => r.id) }
  };
}
