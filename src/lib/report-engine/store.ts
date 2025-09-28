import type { ReportResult } from "@/lib/report-engine/contracts/reportSchemas";

const mem = new Map<string, ReportResult>();

export async function saveReport(r: ReportResult): Promise<void> {
  mem.set(r.id, r);
}
export async function getReport(id: string): Promise<ReportResult | null> {
  return mem.get(id) ?? null;
}
export async function listReports(): Promise<ReportResult[]> {
  return Array.from(mem.values());
}
