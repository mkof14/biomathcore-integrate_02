import type {
  ReportInput,
  ReportResult,
} from "@/lib/report-engine/contracts/reportSchemas";
/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import type {
  ReportInput,
  ReportResult,
} from "@/lib/report-engine/contracts/reportSchemas";
import { z } from "zod";

export const BlackBoxJobSchema = z.object({
  id: z.string().min(1),
  kind: z.string().min(1),
  payload: z.record(z.unknown()),
  createdAt: z.string().or(z.date()),
});

export const BlackBoxResultSchema = z.object({
  id: z.string().min(1),
  ok: z.boolean(),
  data: z.record(z.unknown()).optional(),
  error: z.string().optional(),
});

export type BlackBoxJob = z.infer<typeof BlackBoxJobSchema>;
export type BlackBoxResult = z.infer<typeof BlackBoxResultSchema>;
