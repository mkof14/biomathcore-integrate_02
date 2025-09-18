export type AuditEvent = {
  actor?: string | null;
  action: string;
  meta?: Record<string, unknown>;
  ts?: number;
};

export async function audit(evt: AuditEvent): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.debug("[audit]", { ...evt, ts: evt.ts ?? Date.now() });
  }
}
