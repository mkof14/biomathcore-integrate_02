import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // --- Catalog: Categories + Services
  const cats = await prisma.$transaction([
    prisma.category.upsert({
      where: { slug: 'vitals' },
      update: {},
      create: { slug: 'vitals', title: 'Vitals & Monitoring' },
    }),
    prisma.category.upsert({
      where: { slug: 'nutrition' },
      update: {},
      create: { slug: 'nutrition', title: 'Nutrition' },
    }),
    prisma.category.upsert({
      where: { slug: 'sleep' },
      update: {},
      create: { slug: 'sleep', title: 'Sleep & Recovery' },
    }),
  ])

  const bySlug = Object.fromEntries(cats.map(c => [c.slug, c.id]))

  await prisma.$transaction([
    prisma.service.upsert({
      where: { slug: 'daily-vitals' },
      update: {},
      create: {
        slug: 'daily-vitals',
        title: 'Daily Vitals',
        description: 'Heart rate, HRV, SpO₂, steps and more — consolidated view.',
        categoryId: bySlug['vitals'],
      },
    }),
    prisma.service.upsert({
      where: { slug: 'glucose-trends' },
      update: {},
      create: {
        slug: 'glucose-trends',
        title: 'Glucose Trends',
        description: 'CGM analytics with fasting windows and excursion detection.',
        categoryId: bySlug['vitals'],
      },
    }),
    prisma.service.upsert({
      where: { slug: 'macro-planner' },
      update: {},
      create: {
        slug: 'macro-planner',
        title: 'Macro Planner',
        description: 'Personalized macronutrient targets and meal templates.',
        categoryId: bySlug['nutrition'],
      },
    }),
    prisma.service.upsert({
      where: { slug: 'sleep-score' },
      update: {},
      create: {
        slug: 'sleep-score',
        title: 'Sleep Score',
        description: 'Sleep staging, efficiency, latency and recovery insights.',
        categoryId: bySlug['sleep'],
      },
    }),
  ])

  // --- Questionnaires
  await prisma.$transaction([
    prisma.questionnaire.upsert({
      where: { slug: 'general-intake' },
      update: {},
      create: {
        slug: 'general-intake',
        title: 'General Intake',
        priority: 1,
        status: 'ACTIVE',
        visibility: 'PUBLIC',
      },
    }),
    prisma.questionnaire.upsert({
      where: { slug: 'nutrition-quick' },
      update: {},
      create: {
        slug: 'nutrition-quick',
        title: 'Nutrition — Quick',
        priority: 2,
        status: 'ACTIVE',
        visibility: 'PUBLIC',
      },
    }),
    prisma.questionnaire.upsert({
      where: { slug: 'sleep-check' },
      update: {},
      create: {
        slug: 'sleep-check',
        title: 'Sleep Check',
        priority: 3,
        status: 'ACTIVE',
        visibility: 'PUBLIC',
      },
    }),
  ])
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); })
