import type { Report } from "@/lib/report-engine/contracts/reportSchemas";

type Row = Report & { createdAt: Date };
const mem = new Map<string, Row>();
const cuid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

export function makeMemoryReportRepo() {
  return {
    async create(data: { userId: string; title: string; lines?: string[]; meta?: any }) {
      const id = cuid();
      const row: Row = {
        id,
        userId: data.userId,
        title: data.title,
        lines: data.lines ?? [],
        meta: data.meta ?? {},
        createdAt: new Date(),
      };
      mem.set(id, row);
      return row;
    },
    async get(id: string) {
      return mem.get(id) ?? null;
    },
  };
}
