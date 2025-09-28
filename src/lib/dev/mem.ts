/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
type Row = { id: string; createdAt: Date; updatedAt: Date; [k: string]: unknown };

const g = globalThis as unknown;
if (!g.__MEM__) g.__MEM__ = {
  ai: new Map<string, Row>(),
  voice: new Map<string, Row>(),
  dg: new Map<string, Row>(),
};
export const mem = g.__MEM__ as {
  ai: Map<string, Row>;
  voice: Map<string, Row>;
  dg: Map<string, Row>;
};
export function uid() { return crypto.randomUUID(); }
export function now() { return new Date(); }
