// global singleton memory repo
type Row = {
  id: string;
  userId: string;
  title: string;
  lines: string[];
  meta?: any;
  createdAt: string;
};

const g = globalThis as any;
g.__report_memory_store ??= new Map<string, Row>();

const nowISO = () => new Date().toISOString();
const rid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

export function makeMemoryReportRepo() {
  const store: Map<string, Row> = (globalThis as any).__report_memory_store;
  return {
    async create(input: {
      userId: string;
      title: string;
      lines: string[];
      meta?: any;
    }) {
      const id = rid();
      const row: Row = {
        id,
        userId: input.userId,
        title: input.title,
        lines: input.lines ?? [],
        meta: input.meta ?? {},
        createdAt: nowISO(),
      };
      store.set(id, row);
      return row;
    },
    async get(id: string) {
      return store.get(id) ?? null;
    },
    async list(limit = 50) {
      const arr = Array.from(store.values()).sort((a, b) =>
        a.createdAt.localeCompare(b.createdAt),
      );
      return arr.slice(0, limit);
    },
  };
}
