import { NextRequest } from "next/server";

// Helper to read env safely
function env(name: string, fallback?: string) {
  const v = process.env[name];
  if (!v || !v.trim()) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing env: ${name}`);
  }
  return v.trim();
}

export type AIResponse = { reply: string };

export async function callAIProvider(
  prompt: string,
  system: string = "You are a helpful medical-style assistant. Be concise, empathetic, and avoid diagnosis. Encourage consulting a clinician for medical concerns.",
): Promise<AIResponse> {
  const provider = (process.env.AI_PROVIDER || "openai").toLowerCase();

  switch (provider) {
    case "openai":
      return callOpenAI(prompt, system);
    case "azure-openai":
      return callAzureOpenAI(prompt, system);
    case "anthropic":
      return callAnthropic(prompt, system);
    case "gemini":
      return callGemini(prompt, system);
    case "bedrock":
      return callBedrock(prompt, system);
    default:
      throw new Error(`Unsupported AI_PROVIDER: ${provider}`);
  }
}

/* ---------- OpenAI (default) ---------- */
async function callOpenAI(prompt: string, system: string): Promise<AIResponse> {
  const key = env("OPENAI_API_KEY");
  const model = env("AI_MODEL", "gpt-4o-mini");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`OpenAI error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const reply = data?.choices?.[0]?.message?.content?.trim() || "";
  return { reply };
}

/* ---------- Azure OpenAI ---------- */
async function callAzureOpenAI(
  prompt: string,
  system: string,
): Promise<AIResponse> {
  const endpoint = env("AZURE_OPENAI_ENDPOINT");
  const key = env("AZURE_OPENAI_API_KEY");
  const deployment = env("AZURE_OPENAI_DEPLOYMENT");
  const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=2024-02-15-preview`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "api-key": key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Azure OpenAI error ${res.status}: ${text}`);
  }
  const data = await res.json();
  const reply = data?.choices?.[0]?.message?.content?.trim() || "";
  return { reply };
}

/* ---------- Anthropic ---------- */
async function callAnthropic(
  prompt: string,
  system: string,
): Promise<AIResponse> {
  const key = env("ANTHROPIC_API_KEY");
  const model = env("ANTHROPIC_MODEL", "claude-3-5-sonnet-latest");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      system,
      max_tokens: 800,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Anthropic error ${res.status}: ${text}`);
  }
  const data = await res.json();
  const reply = data?.content?.[0]?.text?.trim() || "";
  return { reply };
}

/* ---------- Google Gemini ---------- */
async function callGemini(prompt: string, system: string): Promise<AIResponse> {
  const key = env("GEMINI_API_KEY");
  const model = env("GEMINI_MODEL", "gemini-1.5-flash");
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        { role: "user", parts: [{ text: `${system}\n\nUser: ${prompt}` }] },
      ],
      generationConfig: { temperature: 0.4 },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Gemini error ${res.status}: ${text}`);
  }
  const data = await res.json();
  const reply =
    data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
    data?.candidates?.[0]?.content?.parts?.[0]?.inline_data?.data?.trim() ||
    "";
  return { reply };
}

/* ---------- AWS Bedrock (simple HTTPS; для прод лучше AWS SDK) ---------- */
async function callBedrock(
  prompt: string,
  system: string,
): Promise<AIResponse> {
  // Для простоты здесь показан «идеологический» вызов; для прод используйте @aws-sdk/client-bedrock-runtime
  // и подпись SigV4. Этот блок — заглушка с ошибкой по умолчанию:
  throw new Error("Bedrock example: please implement with AWS SDK (SigV4).");
}
