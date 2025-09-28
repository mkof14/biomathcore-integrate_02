/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";

// простое in-memory «хранилище» для девелопмента
const store: unknown[] = [];

export async function POST(req: Request) {
  const body = await req.json();
  // Можно добавить валидацию здесь
  store.push({ at: new Date().toISOString(), ...body });
  return NextResponse.json({ ok: true, saved: { id: store.length, at: store.at(-1).at } });
}
