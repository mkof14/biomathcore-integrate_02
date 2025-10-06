import { NextResponse } from "next/server";
import { getPrisma } from "@/server/util/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const prisma = getPrisma();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "U1001";

  const rows = await prisma.report.findMany({
    where: { userId },
    select: { id: true, title: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({
    items: rows.map((r) => ({
      id: r.id,
      title: r.title ?? "Report",
      createdAt: r.createdAt.toISOString(),
    })),
  });
}
