export type HbxItem = {
  id: string;
  userId: string;
  filename: string;
  mime: string;
  size: number;
  tags?: string[];
  createdAt: string;
  data: Uint8Array; // raw bytes
};

type Store = {
  items: HbxItem[];
  put: (item: Omit<HbxItem, "id" | "createdAt"> & { id?: string }) => HbxItem;
  list: (userId: string) => HbxItem[];
  get: (userId: string, id: string) => HbxItem | undefined;
  usage: (userId: string) => {
    userId: string;
    totalBytes: number;
    files: number;
  };
  clear: (userId: string) => number;
};

const g = globalThis as any;
g.__HBX_STORE__ ||= (() => {
  const items: HbxItem[] = [];
  const cuid = () => {
    // simple cuid-ish
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  };
  const put: Store["put"] = (i) => {
    const it: HbxItem = {
      id: i.id || cuid(),
      createdAt: new Date().toISOString(),
      ...i,
    };
    items.unshift(it);
    return it;
  };
  const list: Store["list"] = (userId) =>
    items.filter((it) => it.userId === userId);
  const get: Store["get"] = (userId, id) =>
    items.find((it) => it.userId === userId && it.id === id);
  const usage: Store["usage"] = (userId) => {
    const mine = list(userId);
    const totalBytes = mine.reduce((s, it) => s + (it.size || 0), 0);
    return { userId, totalBytes, files: mine.length };
  };
  const clear: Store["clear"] = (userId) => {
    const before = items.length;
    for (let i = items.length - 1; i >= 0; i--) {
      if (items[i].userId === userId) items.splice(i, 1);
    }
    return before - items.length;
  };
  const store: Store = { items, put, list, get, usage, clear };
  return store;
})();

export const hbxStore: Store = g.__HBX_STORE__;
