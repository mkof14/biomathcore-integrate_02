import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
async function main() {
  console.log('Seed: nothing to do (no-op).');
  // TODO: добавь реальные insert-ы под модели когда будет нужно
}
main().catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
