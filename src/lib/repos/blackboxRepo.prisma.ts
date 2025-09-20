import { PrismaClient } from "@prisma/client";
import type { BlackBoxJob, BlackBoxResult } from "@/lib/report-engine/contracts/blackboxSchemas";

export function makeBlackboxPrismaRepo(prisma: PrismaClient) {
  return {
    async create(j: Pick<BlackBoxJob, "kind" | "payload">) {
      const r = await prisma.blackboxJob.create({
        data: { kind: j.kind, payload: j.payload as any, status: "queued" },
      });
      return { id: r.id, kind: r.kind, payload: r.payload, createdAt: r.createdAt } as const;
    },

    async list(limit = 50) {
      const rows = await prisma.blackboxJob.findMany({
        orderBy: { createdAt: "desc" },
        take: Math.min(limit, 200),
      });
      return rows.map(r => ({
        id: r.id, kind: r.kind, payload: r.payload, createdAt: r.createdAt, status: r.status,
        result: r.result, error: r.error, canceledAt: r.canceledAt, clearedAt: r.clearedAt
      }));
    },

    async get(id: string) {
      const r = await prisma.blackboxJob.findUnique({ where: { id } });
      return r ? {
        id: r.id, kind: r.kind, payload: r.payload, createdAt: r.createdAt, status: r.status,
        result: r.result, error: r.error, canceledAt: r.canceledAt, clearedAt: r.clearedAt
      } : null;
    },

    async setResult(id: string, res: Omit<BlackBoxResult,"id">) {
      await prisma.blackboxJob.update({
        where: { id }, data: {
          status: res.ok ? "done" : "failed",
          result: res.ok ? (res.data as any) : undefined,
          error:  res.ok ? undefined : (res.error ?? "error"),
        }
      });
    },

    async cancel(id: string) {
      const r = await prisma.blackboxJob.update({
        where: { id }, data: { status: "canceled", canceledAt: new Date() }
      }).catch(() => null);
      return !!r;
    },

    async clear(beforeISO?: string) {
      const where = beforeISO ? { createdAt: { lt: new Date(beforeISO) } } : {};
      const r = await prisma.blackboxJob.updateMany({
        where, data: { clearedAt: new Date() }
      });
      return r.count;
    },
  };
}
