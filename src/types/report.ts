export type ReportPlan = "core" | "daily" | "max";

export interface ReportSection {
  id: string;
  title: string;
  description?: string;
  items?: Array<{ label: string; value: string | number | boolean; hint?: string }>;
  charts?: Array<{ id: string; kind: "bar" | "line" | "pie"; data: any }>;
  notes?: string[];
}

export interface GeneratedReport {
  plan: ReportPlan;
  generatedAt: string;   // ISO
  userId?: string;
  title: string;
  summary?: string;
  sections: ReportSection[];
  meta?: Record<string, unknown>;
}
