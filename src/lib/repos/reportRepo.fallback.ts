type Report = {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  lines: string[];
  meta: Record<string, unknown>;
};

const mem = new Map<string, Report>();

export function makeMemoryReportRepo() {
  return {
    async create(input: { userId: string; title: string; lines?: string[]; meta?: Record<string, unknown> }) {
      const id = `rep_${Math.random().toString(36).slice(2, 10)}`;
      const report: Report = {
        id,
        userId: input.userId,
        title: input.title,
        createdAt: new Date().toISOString(),
        lines: input.lines ?? [],
        meta: input.meta ?? {},
      };
      mem.set(id, report);
      return report;
    },
    async get(id: string) {
      return mem.get(id) ?? null;
    },
  };
}
