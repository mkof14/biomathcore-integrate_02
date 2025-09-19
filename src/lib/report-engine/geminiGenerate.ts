import { z } from "zod";
import { getGemini } from "@/lib/ai/gemini";
import { ReportInputSchema, ReportResultSchema, type ReportInput, type ReportResult } from "@/lib/report-engine/contracts/reportSchemas";

const JsonReportSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.union([z.string(), z.number()]),
  lines: z.array(z.string()),
  meta: z.record(z.unknown()).optional().default({}),
});

export async function generateReport(input: ReportInput): Promise<ReportResult> {
  if (process.env.REPORTS_MOCK === "1") {
    const mock: ReportResult = {
      id: `mock-${Date.now()}`,
      title: input.title,
      createdAt: new Date().toISOString(),
      lines: [
        "This is a mocked report (REPORTS_MOCK=1).",
        `userId=${input.userId}`,
        `params=${JSON.stringify(input.params)}`,
      ],
      meta: { mock: true },
    };
    return ReportResultSchema.parse(mock);
  }

  const model = getGemini();
  if (!model) throw new Error("Gemini model not available");

  const prompt = [
    "You are a reporting engine. Produce concise bullet lines (max 8).",
    "Return strictly JSON matching this schema: {id,title,createdAt,lines[],meta{}}.",
    `Title: ${input.title}`,
    `UserId: ${input.userId}`,
    `Params: ${JSON.stringify(input.params ?? {})}`,
  ].join("\n");

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 1024,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          createdAt: { oneOf: [{ type: "string" }, { type: "number" }] },
          lines: { type: "array", items: { type: "string" } },
          meta: { type: "object", additionalProperties: true },
        },
        required: ["id", "title", "createdAt", "lines"],
        additionalProperties: true,
      } as any,
    } as any,
  });

  const text = result.response.text();
  const parsed = JsonReportSchema.parse(JSON.parse(text));
  const normalized: ReportResult = {
    id: String(parsed.id),
    title: parsed.title,
    createdAt: typeof parsed.createdAt === "number"
      ? new Date(parsed.createdAt).toISOString()
      : parsed.createdAt,
    lines: parsed.lines,
    meta: parsed.meta ?? {},
  };

  return ReportResultSchema.parse(normalized);
}

export async function runReport(inputUnknown: unknown) {
  const input = ReportInputSchema.parse(inputUnknown);
  return generateReport(input);
}
