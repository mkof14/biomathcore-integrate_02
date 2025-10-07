import { NextResponse } from "next/server";
import { getBlackboxRepo } from "@/lib/repos/blackboxRepo";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const row = await getBlackboxRepo().get(id);
  if (!row)
    return NextResponse.json(
      { ok: false, error: "not_found" },
      { status: 404 },
    );
  return NextResponse.json({ ok: true, job: row });
}
