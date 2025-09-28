import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.questionnaire.upsert({
    where: { slug: "general-health" },
    create: {
      slug: "general-health",
      title: "General Health Intake",
      status: "ACTIVE",
    },
    update: {
      title: "General Health Intake",
      status: "ACTIVE",
    },
  });
  console.log("✅ Seeded questionnaire: general-health");
}
main().finally(() => prisma.$disconnect());
