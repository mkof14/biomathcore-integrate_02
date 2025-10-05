import { ReportJSON } from "@/types/report";

export async function generateReport(input: { topic: string; userId?: string }): Promise<ReportJSON> {
  const prompt = `Create structured JSON report v1.0 about "${input.topic}". 
Return strictly JSON with keys: version, title, createdAt, sections[id,title,content].`;

  const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="+process.env.GOOGLE_GENAI_API_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });
  const data = await r.json();

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
  let parsed: ReportJSON;
  try { parsed = JSON.parse(text); }
  catch {
    parsed = { version: "1.0", title: input.topic, createdAt: new Date().toISOString(), sections: [{ id: "intro", title: "Overview", content: text }] };
  }
  return parsed;
}
