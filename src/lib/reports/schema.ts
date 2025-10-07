import { z } from "zod";
export const ReportMetric = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  value: z.union([z.string(), z.number(), z.boolean(), z.null()]).nullable(),
  unit: z.string().optional(),
  series: z.array(z.object({ t: z.union([z.string(), z.number()]), v: z.number().nullable() })).optional(),
});
export const ReportTable = z.object({
  columns: z.array(z.string().min(1)).min(1),
  rows: z.array(z.array(z.union([z.string(), z.number(), z.boolean(), z.null()]))),
  note: z.string().optional(),
});
export const ReportSection = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  metrics: z.array(ReportMetric).optional(),
  tables: z.array(ReportTable).optional(),
  html: z.string().optional(),
});
export const ReportDocument = z.object({
  plan: z.enum(["core","daily","max"]),
  reportId: z.string().min(1),
  generatedAt: z.string().datetime().or(z.number()),
  templateVersion: z.string().min(1),
  userId: z.string().optional(),
  summary: z.string().optional(),
  sections: z.array(ReportSection).min(1),
}).passthrough();
export type TReportDocument = z.infer<typeof ReportDocument>;
export function validateReport(json: unknown): TReportDocument { return ReportDocument.parse(json); }
