import { getPrisma } from "@/server/util/prisma";
import { embed } from "./embedding";

// cosine similarity fallback (если используешь pgvector ORDER BY <->, этот код не нужен)
function cosine(a: number[], b: number[]) {
  let dot = 0,
    na = 0,
    nb = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-9);
}

export async function retrieveUserContext(
  userId: string,
  query: string,
  k = 6,
) {
  const prisma = getPrisma();
  const qEmb = await embed(query);

  // Быстрый fallback: загружаем свежие чанки и сортируем по косинусу в приложении.
  // В продакшене лучше делать векторный поиск прямо в БД (pgvector).
  const chunks = await prisma.chunk.findMany({
    where: { userId },
    take: 200,
    orderBy: { createdAt: "desc" },
  });

  const scored = chunks
    .map((c) => ({
      c,
      score: cosine(qEmb, (c.embedding as unknown as number[]) || []),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map(({ c, score }) => ({
      id: c.id,
      text: c.text,
      sourceId: c.sourceId,
      sourceType: c.sourceType,
      score,
    }));

  return scored;
}
