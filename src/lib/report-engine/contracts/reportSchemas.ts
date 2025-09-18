/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { z } from "zod";

export const ReportInputSchema = z.object({
  userId: z.string().min(1),
  title: z.string().min(1),
  params: z.record(z.any()).default({ /* TODO: implement or remove */ }),
});

export const ReportResultSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  createdAt: z.string().or(z.date()),
  lines: z.array(z.string()).default([]),
  meta: z.record(z.any()).default({ /* TODO: implement or remove */ }),
});

export type ReportInput = z.infer<typeof ReportInputSchema>;
export type ReportResult = z.infer<typeof ReportResultSchema>;
