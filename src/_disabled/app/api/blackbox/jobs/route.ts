import { NextResponse } from "next/server";
import { getBlackboxRepo } from "@/lib/repos/blackboxRepo";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}) as any);
  const kind = typeof body?.kind === "string" ? body.kind : "demo";
  const payload = body?.payload ?? {};
  const job = await getBlackboxRepo().create({ kind, payload });
  return NextResponse.json({ ok: true, job });
}

export async function GET() {
  const rows = await getBlackboxRepo().list(50);
  return NextResponse.json({ ok: true, jobs: rows });
}
