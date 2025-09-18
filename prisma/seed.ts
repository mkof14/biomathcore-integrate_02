/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  // User
  const user = await prisma.user.upsert({
    where: { email: "demo@biomathcore.local" },
    update: {},
    create: { email: "demo@biomathcore.local", name: "Demo User" },
  });

  // Questionnaire
  const qn = await prisma.questionnaire.upsert({
    where: { slug: "patient-questionnaire" },
    update: {},
    create: { slug: "patient-questionnaire", title: "Patient Questionnaire" },
  });

  // Questions
  const questionsData = [
    { text: "Full name", type: "text", order: 1 },
    { text: "Date of birth", type: "date", order: 2 },
    { text: "Height (cm)", type: "number", order: 3 },
    { text: "Weight (kg)", type: "number", order: 4 },
    { text: "Allergies", type: "textarea", order: 5 },
  ];
  for (const [idx, q] of questionsData.entries()) {
    await prisma.question.upsert({
      where: { id: `seed-q-${idx}` },
      update: { text: q.text, type: q.type, order: q.order, questionnaireId: qn.id },
      create: { id: `seed-q-${idx}`, text: q.text, type: q.type, order: q.order, questionnaireId: qn.id },
    });
  }

  // Report
  await prisma.report.create({
    data: {
      title: "Welcome Report",
      body: "Seeded demo report.",
      userId: user.id,
    },
  });

  await prisma.$disconnect();
  console.log("Seed completed.");
}

main().catch(async (e) => {
  console.error(e);
  process.exitCode = 1;
});
