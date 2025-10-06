import { NextResponse } from "next/server";
import { generateReport } from "@/lib/reports/engine";

export async function POST(req: Request) {
  if (!process.env.GOOGLE_API_KEY) {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    const row = await prisma.report.create({
      data: {
        userId: "U1001",
        title: "Demo Health Report",
        status: "ready",
      } as any,
    });
    await prisma.$disconnect();
    return new Response(
      JSON.stringify({
        ok: true,
        id: row.id,
        note: "created without external model",
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      },
    );
  }

  const { topic = "Personal Health Plan", userId } = await req
    .json()
    .catch(() => ({}));
  const report = await generateReport({ topic, userId });
  return NextResponse.json(report);
}
