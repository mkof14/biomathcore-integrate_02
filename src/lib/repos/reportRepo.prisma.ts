import type { PrismaClient } from "@prisma/client";
import type { Report } from "@/lib/report-engine/contracts/reportSchemas";

export function makePrismaReportRepo(prisma: PrismaClient) {
  return {
    async create(data: {
      userId: string;
      title: string;
      lines?: string[];
      meta?: any;
    }): Promise<Report> {
      const r = await prisma.report.create({
        data: {
          userId: data.userId,
          title: data.title,
          lines: data.lines ?? [],
          meta: data.meta ?? {},
        },
      });
      return {
        id: r.id,
        title: r.title,
        userId: r.userId,
        lines: (r as any).lines ?? [],
        meta: (r as any).meta ?? {},
        createdAt: r.createdAt,
      };
    },
    async get(id: string): Promise<Report | null> {
      const r = await prisma.report.findUnique({ where: { id } });
      if (!r) return null;
      return {
        id: r.id,
        title: r.title,
        userId: r.userId,
        lines: (r as any).lines ?? [],
        meta: (r as any).meta ?? {},
        createdAt: r.createdAt,
      };
    },
  };
}
