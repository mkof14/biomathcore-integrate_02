/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const items = await prisma.medicalDocument.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: { id: true, objectKey: true, contentType: true, sizeBytes: true, createdAt: true },
    } as unknown);
    return NextResponse.json({ ok: true, items });
  } catch (e) {
    // Fallback если модели нет — возвращаем пустой список, но не ломаем UI
    return NextResponse.json({ ok: true, items: [] });
  }
}
