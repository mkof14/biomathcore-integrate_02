/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const existing = await prisma.questionnaire.findMany({ take: 1 });
    if (existing.length > 0) {
      return NextResponse.json({ ok: true, note: "already present" });
    }

    const data = [
      { slug: "general-health", title: "General Health", status: "ACTIVE", priority: 1 },
      { slug: "lifestyle", title: "Lifestyle & Habits", status: "ACTIVE", priority: 2 },
      { slug: "nutrition", title: "Nutrition Basics", status: "ACTIVE", priority: 3 },
      { slug: "psychology-initial", title: "Psychology Intake", status: "ACTIVE", priority: 4 },
      { slug: "sexual-health-screening", title: "Sexual Health Screening", status: "ACTIVE", priority: 5 },
      { slug: "longevity-baseline", title: "Longevity Baseline", status: "ACTIVE", priority: 6 },
    ];

    for (const q of data) {
      await prisma.questionnaire.create({ data: q });
    }

    return NextResponse.json({ ok: true, created: data.length });
  } catch (e: unknown) {
    console.error("seed error:", e);
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
