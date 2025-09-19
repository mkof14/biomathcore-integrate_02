import "dotenv/config";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
const days = parseInt(process.env.BLACKBOX_RETENTION_DAYS ?? "3", 10);

async function main() {
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const res = await prisma.blackboxJob.deleteMany({
    where: { createdAt: { lt: cutoff } },
  });
  console.log(`Retention: cleared ${res.count} jobs older than ${days} days`);
}

main()
  .catch((e) => {
    console.error("Retention job failed", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
