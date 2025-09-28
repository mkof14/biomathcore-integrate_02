import { NextResponse } from "next/server";
import { hbxStore } from "@/lib/hbx/store.memory";

export const runtime = "nodejs";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "U1001";
  const it = hbxStore.get(userId, id);
  if (!it) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  return new NextResponse(it.data, {
    status: 200,
    headers: {
      "content-type": it.mime || "application/octet-stream",
      "content-disposition": `attachment; filename*=UTF-8''${encodeURIComponent(it.filename)}`,
      "x-hbx-id": it.id,
    },
  } as any);
}
