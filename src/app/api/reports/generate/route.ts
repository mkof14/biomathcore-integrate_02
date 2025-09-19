import { NextResponse } from "next/server";
import { reportRepo } from "@/lib/repos/reportRepo.memory";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { userId, title, params } = body || {};
    if (!userId || !title) {
      return NextResponse.json({ ok: false, error: "userId and title required" }, { status: 400 });
    }
    const lines = Array.isArray(params?.lines) ? params.lines : [];
    const r = await reportRepo.create({ userId, title, lines, meta: { source: "mock" } });
    return NextResponse.json({ ok: true, id: r.id, title: r.title, lines: r.lines, createdAt: r.createdAt });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "internal" }, { status: 500 });
  }
}
