const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function toChunks(text, chunkSize = 900, overlap = 120) {
  const words = String(text || "").split(/\s+/);
  const out = [];
  for (let i = 0; i < words.length; i += (chunkSize - overlap)) {
    const slice = words.slice(i, i + chunkSize).join(" ").trim();
    if (slice) out.push(slice);
  }
  return out.length ? out : [String(text || "").slice(0, 1200)];
}

async function embed(text) {
  const h = crypto.createHash("sha256").update(text).digest();
  return Array.from(h.slice(0, 256)).map(b => (b - 128) / 128); // псевдо-вектор (заглушка)
}

async function indexDoc(userId, sourceId, sourceType, text) {
  const chunks = toChunks(text);
  for (const t of chunks) {
    const e = await embed(t);
    await prisma.chunk.create({
      data: { userId, sourceId, sourceType, text: t, embedding: e },
    });
  }
}

(async () => {
  const userId = process.argv[2] || "U1001";
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found: "+userId);

  const forms = await prisma.form.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 3 });
  const reports = await prisma.report.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 3 });

  // почистим старые чанки этого юзера (опционально)
  await prisma.chunk.deleteMany({ where: { userId } });

  let added = 0;
  for (const f of forms) {
    const text = [
      `Form: ${f.title}`,
      JSON.stringify(f.data ?? {}, null, 2),
    ].join("\n");
    await indexDoc(userId, f.id, "form", text);
    added++;
  }
  for (const r of reports) {
    const text = [
      `Report: ${r.title} [${r.kind}]`,
      r.summary || "",
      JSON.stringify(r.data ?? {}, null, 2),
    ].join("\n");
    await indexDoc(userId, r.id, "report", text);
    added++;
  }

  const count = await prisma.chunk.count({ where: { userId } });
  console.log(JSON.stringify({ ok: true, indexedDocs: added, chunkCount: count }, null, 2));
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
