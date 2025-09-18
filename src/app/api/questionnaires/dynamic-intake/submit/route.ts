import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const payload = await req.json().catch(() => ({}));
  // TODO: save to DB later. For now always succeed.
  return NextResponse.json({ ok: true, echo: payload });
}
