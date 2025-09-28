import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
  // пример сидов, закомментируй/замени на реальные таблицы
  // await prisma.questionnaire.upsert({ ... })
  console.log("Seed: (placeholder) done");
}
main().finally(() => prisma.$disconnect());
