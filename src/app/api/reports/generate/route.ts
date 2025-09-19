import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

// Простое in-memory хранилище между запросами в рамках процесса
const g = globalThis as unknown as { __reports?: Map<string, any> };
g.__reports ||= new Map();

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { userId, title } = body || {};
  if (!userId || !title) {
    return NextResponse.json({ ok: false, error: "bad input" }, { status: 400 });
  }

  const id = randomUUID();
  const rec = { ok: true, id, report: { id, title, lines: [] } };
  g.__reports!.set(id, rec);

  // Твой смоук ждёт хотя бы { id, ok }
  return NextResponse.json({ id, ok: true }, { status: 200 });
}
