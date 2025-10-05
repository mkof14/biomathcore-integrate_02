import { NextResponse } from "next/server";
import { createReadStream, existsSync } from "fs";
import { stat } from "fs/promises";
import { getHbxRepo } from "@/lib/repos/hbxFileRepo";

export const runtime = "nodejs";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const repo = getHbxRepo();
  const row = await repo.get(id);
  if (!row) return NextResponse.json({ ok:false, error:"not_found" }, { status:404 });

  if (!existsSync(row.diskPath)) {
    return NextResponse.json({ ok:false, error:"blob_missing" }, { status:410 });
  }
  const st = await stat(row.diskPath);
  const stream = createReadStream(row.diskPath);
  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": row.mime || "application/octet-stream",
      "Content-Length": String(st.size),
      "Content-Disposition": `attachment; filename="${encodeURIComponent(row.filename)}"`,
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}
