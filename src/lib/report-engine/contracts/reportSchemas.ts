import { z } from "zod";

export const ReportInputSchema = z.object({
  userId: z.string().min(1),
  title: z.string().min(1),
  params: z.object({
    prompt: z.string().min(1).optional(),
    lines: z.array(z.string()).optional(),
    meta: z.record(z.any()).optional(),
  }).optional(),
});
export type ReportInput = z.infer<typeof ReportInputSchema>;

export const ReportSchema = z.object({
  id: z.string(),
  title: z.string(),
  userId: z.string(),
  lines: z.array(z.string()).optional(),
  meta: z.any().optional(),
  createdAt: z.coerce.date(),
});
export type Report = z.infer<typeof ReportSchema>;

export const ReportResultSchema = z.object({
  title: z.string(),
  id: z.string().optional(),
  lines: z.array(z.string()),
  meta: z.any().optional(),
});
export type ReportResult = z.infer<typeof ReportResultSchema>;
