import { ReportInput } from "./contracts/reportSchemas";

type GenResult = { lines: string[]; meta?: any };

export async function generateWithGemini(
  input: ReportInput,
): Promise<GenResult> {
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const prompt =
    input.params?.prompt ??
    `Generate 5 short bullet insights for a report titled "${input.title}".`;

  // если ключа нет — мягкий мок, чтобы смоуки шли зелёными
  if (!key) {
    return {
      lines: [
        `(${input.title}) mock line 1`,
        `(${input.title}) mock line 2`,
        `(${input.title}) mock line 3`,
      ],
      meta: { source: "mock", reason: "NO_API_KEY" },
    };
  }

  // реальный вызов
  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const resp = await model.generateContent([
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ]);

  const text = resp.response?.text?.() ?? "";
  // простейший парсер — разбить по строкам/буллитам
  const rawLines = text
    .split(/\r?\n/)
    .map((s) => s.replace(/^[\-\*\d\.\)\s]+/, "").trim())
    .filter(Boolean)
    .slice(0, 10);

  return {
    lines: rawLines.length ? rawLines : [text.trim()].filter(Boolean),
    meta: { source: "gemini" },
  };
}
