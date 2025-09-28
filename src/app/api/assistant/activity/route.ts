import { NextResponse } from "next/server";
import { getPrisma } from "@/server/util/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const prisma = getPrisma();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "U1001";

  const rows = await prisma.aIRun.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 10,
    select: { id:true, userId:true, model:true, duration:true, tokensIn:true, tokensOut:true, fallback:true, status:true, createdAt:true },
  });

  return NextResponse.json({
    items: rows.map(r => ({
      id: r.id,
      userId: r.userId,
      model: r.model ?? null,
      duration: r.duration,
      tokensIn: r.tokensIn,
      tokensOut: r.tokensOut,
      status: r.status,
      fallback: !!r.fallback,
      createdAt: r.createdAt.toISOString(),
    })),
  });
}
