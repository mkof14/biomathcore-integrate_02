import { prisma } from "@/server/util/prisma";
import { embed } from "@/server/rag/embedding";
import { toChunks } from "./chunker";

export async function indexDocument(userId: string, sourceId: string, sourceType: "form"|"report"|"file", text: string) {
  const chunks = toChunks(text);
  for (const t of chunks) {
    const e = await embed(t);
    await prisma.chunk.create({
      data: { userId, sourceId, sourceType, text: t, embedding: e as unknown as any },
    });
  }
}
