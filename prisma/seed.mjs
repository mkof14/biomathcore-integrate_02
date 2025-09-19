import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@biomathcore.local' },
    update: {},
    create: { email: 'demo@biomathcore.local', name: 'Demo' },
  });

  const qn = await prisma.questionnaire.upsert({
    where: { slug: 'patient-questionnaire' },
    update: {},
    create: { slug: 'patient-questionnaire', title: 'Patient Questionnaire', status: 'draft', visibility: 'private' },
  }).catch(()=>null);

  if (qn) {
    const qs = [
      { id: 'seed-q-0', text: 'Full name', type: 'text', order: 1 },
      { id: 'seed-q-1', text: 'Date of birth', type: 'date', order: 2 },
      { id: 'seed-q-2', text: 'Height (cm)', type: 'number', order: 3 },
      { id: 'seed-q-3', text: 'Weight (kg)', type: 'number', order: 4 },
      { id: 'seed-q-4', text: 'Allergies', type: 'textarea', order: 5 },
    ];
    for (const q of qs) {
      await prisma.question.upsert({
        where: { id: q.id },
        update: { ...q, questionnaireId: qn.id },
        create: { ...q, questionnaireId: qn.id },
      }).catch(()=>{});
    }
  }

  await prisma.report.create({
    data: { title: 'Welcome Report', body: 'Seeded demo report.', userId: user.id },
  }).catch(()=>{});
}

main().finally(()=>prisma.$disconnect());
