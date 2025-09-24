import { createHash } from "crypto";

export type Embedder = (text: string) => Promise<number[]>;

// Заглушка: подключи здесь свой эмбеддер (OpenAI text-embedding-3-large/small)
export const embed: Embedder = async (text: string) => {
  // TODO: replace with real embedding API call
  // временно делаем псевдо-вектор, чтобы не падало
  const h = createHash("sha256").update(text).digest();
  const arr = Array.from(h.slice(0, 256)).map((b) => (b - 128) / 128);
  return arr;
};
