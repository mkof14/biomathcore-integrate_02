export type AuditEvent = {
  actor?: string | null;
  action: string;
  meta?: Record<string, unknown>;
  ts?: number;
};

export async function audit(evt: AuditEvent): Promise<void> {
  // eslint-disable-next-line no-console
  console.debug('[audit]', { ...evt, ts: evt.ts ?? Date.now() });
}
