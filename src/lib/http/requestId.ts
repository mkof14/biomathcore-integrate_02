import { nanoid } from "nanoid";
export function ensureRequestId(headers: Headers): string {
  const existing = headers.get("x-request-id");
  if (existing) return existing;
  const id = nanoid();
  headers.set("x-request-id", id);
  return id;
}
