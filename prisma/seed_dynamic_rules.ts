import { PrismaClient, RuleTargetType } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.questionnaire.upsert({
    where: { slug: "dynamic-intake" },
    create: { slug: "dynamic-intake", title: "Dynamic Health Intake", status: "ACTIVE" },
    update: {},
  });

  await prisma.questionnaireRule.upsert({
    where: { id: "base-core-plan" },
    create: {
      id: "base-core-plan",
      target: RuleTargetType.PLAN,
      slug: "core-plan",
      priority: 1,
      fields: [
        { name: "fullName",   label: "Full name", type: "text", required: true },
        { name: "age",        label: "Age", type: "number", required: true, min: 1, max: 120 },
        { name: "sex",        label: "Sex", type: "select", options: ["Female","Male","Other"], required: true },
        { name: "goals",      label: "Main health goals", type: "textarea" },
        { name: "consent",    label: "I consent to store and process my data for care", type: "checkbox", required: true },
      ],
    },
    update: {},
  });

  await prisma.questionnaireRule.upsert({
    where: { id: "cat-sleep-recovery" },
    create: {
      id: "cat-sleep-recovery",
      target: RuleTargetType.CATEGORY,
      slug: "sleep-recovery",
      priority: 10,
      fields: [
        { name: "sleepHours",        label: "Average sleep (hours)", type: "number", min: 0, max: 24 },
        { name: "sleepLatency",      label: "Time to fall asleep (minutes)", type: "number", min: 0, max: 180 },
        { name: "sleepInterruptions", label: "Night awakenings (per night)", type: "number", min: 0, max: 20 },
      ],
    },
    update: {},
  });

  console.log("Seeded dynamic rules");
}
main().finally(() => prisma.$disconnect());
