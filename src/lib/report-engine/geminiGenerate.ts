import {
  ReportInput,
  ReportResultSchema,
} from "@/lib/report-engine/contracts/reportSchemas";

export async function generateReport(input: ReportInput) {
  const forceMock =
    !!process.env.REPORTS_MOCK && process.env.REPORTS_MOCK !== "0";
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const prompt =
    input.params?.prompt ??
    `Generate 5 short bullet insights for a report titled "${input.title}".`;

  if (forceMock || !key) {
    const mock = {
      title: input.title,
      lines: [
        `(${input.title}) mock line 1`,
        `(${input.title}) mock line 2`,
        `(${input.title}) mock line 3`,
      ],
      meta: {
        source: "mock",
        reason: forceMock ? "FORCED" : "NO_API_KEY",
        mock: true,
      },
    };
    return ReportResultSchema.parse(mock);
  }

  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const resp = await model.generateContent([
    { role: "user", parts: [{ text: prompt }] },
  ]);
  const text = resp.response?.text?.() ?? "";

  const rawLines = text
    .split(/\r?\n/)
    .map((s) => s.replace(/^[\-\*\d\.\)\s]+/, "").trim())
    .filter(Boolean)
    .slice(0, 10);

  const out = {
    title: input.title,
    lines: rawLines.length ? rawLines : [text.trim()].filter(Boolean),
    meta: { source: "gemini" },
  };
  return ReportResultSchema.parse(out);
}

/** совместимость со старым именем */
export async function generateWithGemini(input: ReportInput) {
  return generateReport(input);
}
