import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const hasModel = (name) => Object.prototype.hasOwnProperty.call(prisma, name);

const upsertUser = async () => {
  if (!hasModel('user') && !hasModel('User')) return;
  const m = hasModel('user') ? 'user' : 'User';
  try {
    await prisma[m].upsert({
      where: { email: "demo@biomathcore.local" },
      update: {},
      create: { email: "demo@biomathcore.local", name: "Demo User" }
    });
  } catch {}
};

const createReport = async () => {
  const m = hasModel('report') ? 'report' : (hasModel('Report') ? 'Report' : null);
  const u = hasModel('user') ? 'user' : (hasModel('User') ? 'User' : null);
  if (!m || !u) return;
  try {
    const user = await prisma[u].findFirst({ where: { email: "demo@biomathcore.local" } });
    if (!user?.id) return;
    await prisma[m].create({ data: { title: "Welcome Report", body: "Seeded demo report.", userId: user.id } });
  } catch {}
};

const seedQuestionnaire = async () => {
  const qm = hasModel('questionnaire') ? 'questionnaire' : (hasModel('Questionnaire') ? 'Questionnaire' : null);
  const qsm = hasModel('question') ? 'question' : (hasModel('Question') ? 'Question' : null);
  if (!qm || !qsm) return;
  try {
    const qn = await prisma[qm].upsert({
      where: { slug: "patient-questionnaire" },
      update: {},
      create: { slug: "patient-questionnaire", title: "Patient Questionnaire" }
    });
    const questions = [
      { text: "Full name", type: "text", order: 1 },
      { text: "Date of birth", type: "date", order: 2 },
      { text: "Height (cm)", type: "number", order: 3 },
      { text: "Weight (kg)", type: "number", order: 4 },
      { text: "Allergies", type: "textarea", order: 5 }
    ];
    for (let i = 0; i < questions.length; i++) {
      const id = `seed-q-${i}`;
      try {
        await prisma[qsm].upsert({
          where: { id },
          update: { ...questions[i], questionnaireId: qn.id },
          create: { id, ...questions[i], questionnaireId: qn.id }
        });
      } catch {}
    }
  } catch {}
};

const main = async () => {
  await upsertUser();
  await seedQuestionnaire();
  await createReport();
};

main().then(async () => { await prisma.$disconnect(); console.log("Seed completed."); })
.catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
