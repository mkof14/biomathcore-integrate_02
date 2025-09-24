import { createHash } from "crypto";

/** Конфиг из ENV */
const PROVIDER = (process.env.AI_EMBED_PROVIDER || "openai").toLowerCase(); // "openai" | "gemini" | "stub"
const OPENAI_MODEL = process.env.AI_EMBED_MODEL || "text-embedding-3-small";
const GEMINI_MODEL = process.env.GEMINI_EMBED_MODEL || "text-embedding-004";

/** Универсальный тип эмбеддера */
export type Embedder = (text: string) => Promise<number[]>;

/** Нормализация и проверка массива */
function toNumberArray(x: any): number[] {
  if (!Array.isArray(x)) return [];
  const out: number[] = [];
  for (const v of x) {
    const n = typeof v === "number" ? v : Number(v);
    if (Number.isFinite(n)) out.push(n);
  }
  return out;
}

/** Заглушка: псевдо-вектор SHA-256→256 float’ов (на случай отсутствия ключей/429) */
export const embedStub: Embedder = async (text: string) => {
  const h = createHash("sha256").update(text || "").digest();
  return Array.from(h.slice(0, 256)).map((b) => (b - 128) / 128);
};

/** OpenAI embeddings */
async function embedOpenAI(text: string): Promise<number[]> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return embedStub(text);

  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      input: text,
      model: OPENAI_MODEL,
    }),
  });

  if (!res.ok) {
    // мягкий фолбэк
    const errTxt = await res.text().catch(() => "");
    console.error("[embedding:openai] error", res.status, errTxt.slice(0, 300));
    return embedStub(text);
  }

  const data = (await res.json()) as any;
  const arr = data?.data?.[0]?.embedding;
  const vec = toNumberArray(arr);
  if (!vec.length) return embedStub(text);
  return vec;
}

/** Gemini embeddings (text-embedding-004) */
async function embedGemini(text: string): Promise<number[]> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return embedStub(text);

  // Документация: https://ai.google.dev/api/embeddings
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    GEMINI_MODEL
  )}:embedContent?key=${encodeURIComponent(key)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      content: { parts: [{ text: String(text || "") }] },
      taskType: "RETRIEVAL_DOCUMENT",
    }),
  });

  if (!res.ok) {
    const errTxt = await res.text().catch(() => "");
    console.error("[embedding:gemini] error", res.status, errTxt.slice(0, 300));
    return embedStub(text);
  }

  const data = (await res.json()) as any;
  // В Gemini ответ лежит в data.embedding.values
  const values = data?.embedding?.values || data?.data?.[0]?.embedding?.values;
  const vec = toNumberArray(values);
  if (!vec.length) return embedStub(text);
  return vec;
}

/** Выбранный эмбеддер */
let providerImpl: Embedder;
switch (PROVIDER) {
  case "gemini":
    providerImpl = embedGemini;
    break;
  case "stub":
    providerImpl = embedStub;
    break;
  case "openai":
  default:
    providerImpl = embedOpenAI;
    break;
}

/** Экспортируем единый embed() */
export const embed: Embedder = async (text: string) => providerImpl(text);
