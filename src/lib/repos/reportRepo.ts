import { makeMemoryReportRepo } from "./reportRepo.fallback";

let prismaRepo: any | null = null;

export function getReportRepo() {
  const backend = process.env.REPORTS_BACKEND ?? "memory";
  if (backend === "prisma") {
    if (!prismaRepo) {
      // ленивый импорт, корректный alias для Next: "@/lib/prisma"
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const pkg = require("@/lib/prisma");
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { makePrismaReportRepo } = require("./reportRepo.prisma");
      prismaRepo = makePrismaReportRepo(pkg.prisma);
    }
    return prismaRepo;
  }
  return makeMemoryReportRepo();
}
