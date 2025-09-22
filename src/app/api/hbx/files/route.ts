import { NextResponse } from "next/server";
import { promises as fsp } from "fs";
import path from "path";
import { getHbxRepo } from "@/lib/repos/hbxFileRepo";
import { resolveUserId } from "@/lib/hbx/user";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const repo = getHbxRepo();
  const url = new URL(req.url);
  const userId = resolveUserId(undefined, url);
  const items = await repo.listByUser(userId, 500);
  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  if (process.env.HBX_ENABLED !== "1") {
    return NextResponse.json({ ok:false, error:"disabled" }, { status: 503 });
  }

  const url = new URL(req.url);
  const userId = resolveUserId(req.headers, url);

  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("multipart/form-data")) {
    return NextResponse.json({ ok:false, error:"expected_multipart" }, { status: 400 });
  }

  const form = await req.formData();
  const repo = getHbxRepo();

  const saved: any[] = [];
  for (const [, val] of form.entries()) {
    if (val instanceof File) {
      const arrayBuffer = await val.arrayBuffer();
      const buf = Buffer.from(arrayBuffer);
      const uploadsDir = path.resolve(process.cwd(), "var/uploads");
      await fsp.mkdir(uploadsDir, { recursive: true });
      const id = crypto.randomUUID();
      const diskPath = path.join(uploadsDir, id + "_" + val.name.replace(/[^\w\.-]+/g, "_"));
      await fsp.writeFile(diskPath, buf);
      const meta = await repo.put({
        id,
        userId,
        filename: val.name,
        mime: val.type || "application/octet-stream",
        size: buf.length,
        tags: (form.getAll("tags") as string[]).filter(Boolean),
        diskPath,
      });
      saved.push(meta);
    }
  }

  if (saved.length === 0) {
    return NextResponse.json({ ok:false, error:"no_files" }, { status: 400 });
  }
  return NextResponse.json({ ok: true, saved });
}
