import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
  const prisma = new PrismaClient();
  try {
    const body = await req.json().catch(() => ({} as any));
    const src = (body?.data ?? body ?? {}) as any;

    const userId = src.userId ?? "U1001";
    const title = src.title ?? "Demo Health Report";
    const status = src.status ?? "ready";
    const kind = src.kind ?? "demo";

    const row = await prisma.report.create({
      data: { userId, title, status, kind },
    });

    return NextResponse.json({ ok: true, id: row.id });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
  } finally {
    await prisma.$disconnect().catch(() => {});
  }
}
