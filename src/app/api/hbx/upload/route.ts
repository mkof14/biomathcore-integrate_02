import { NextResponse } from "next/server";

/**
 * Demo upload handler:
 * - Accepts multipart/form-data with field "file"
 * - Returns a JSON { ok: true, name, size }
 * (Does not persist the file; wire to storage later.)
 */
export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) {
    return NextResponse.json(
      { ok: false, error: "No file provided" },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true, name: file.name, size: file.size });
}
