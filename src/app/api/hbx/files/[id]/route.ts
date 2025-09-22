import { NextResponse } from "next/server";
import { getHbxRepo } from "@/lib/repos/hbxFileRepo";

export const runtime = "nodejs";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const repo = getHbxRepo();
  const row = await repo.get(id);
  if (!row) return NextResponse.json({ ok:false, error:"not_found" }, { status:404 });
  return NextResponse.json({
    ok: true,
    file: {
      id: row.id,
      userId: row.userId,
      filename: row.filename,
      mime: row.mime,
      size: row.size,
      tags: row.tags,
      createdAt: row.createdAt,
      downloadUrl: `/api/hbx/files/${row.id}/download`,
    }
  });
}
