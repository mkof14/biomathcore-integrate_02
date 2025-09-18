import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const all = await prisma.questionnaire.findMany({
      where: { status: "ACTIVE" },
      orderBy: [{ priority: "asc" }, { title: "asc" }],
      select: {
        id: true, slug: true, title: true, status: true, priority: true,
        updatedAt: true, createdAt: true,
      },
    });

    // Keep 'sections' as a temporary stub to satisfy UI expectations
    const questionnaires = all.map(q => ({ ...q, sections: [] }));
    return NextResponse.json({ ok: true, questionnaires });
  } catch (err) {
    console.error("questionnaires GET error:", err);
    return NextResponse.json({ ok: false, error: "failed" }, { status: 500 });
  }
}
