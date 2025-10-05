import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST() {
  try {
    const row = await prisma.report.create({
      data: { userId: "U1001", title: "Demo Health Report", status: "ready" } as any,
    });
    return NextResponse.json({ ok: true, id: row.id });
  } catch (e:any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
