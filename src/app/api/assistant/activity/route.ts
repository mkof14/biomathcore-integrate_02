import { NextResponse } from "next/server";
import { getPrisma } from "@/server/util/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/assistant/activity?userId=U1001
 * Возвращает последние 10 запусков ассистента для пользователя.
 */
export async function GET(req: Request) {
  const prisma = getPrisma();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "U1001";

  const rows = await prisma.aIRun.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 10,
    select: {
      id: true, model: true, duration: true, tokensIn: true, tokensOut: true,
      fallback: true, status: true, createdAt: true,
    },
  });

  const items = rows.map(r => ({
    id: r.id,
    model: r.model ?? null,
    duration: r.duration ?? null,
    tokensIn: r.tokensIn ?? null,
    tokensOut: r.tokensOut ?? null,
    fallback: !!r.fallback,
    status: r.status,
    createdAt: r.createdAt.toISOString(),
  }));

  return NextResponse.json({ items });
}
