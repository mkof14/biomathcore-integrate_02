import { NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";

const PROJECT_ID = process.env.GCP_PROJECT_ID!;
const BUCKET = process.env.GCS_BUCKET_MEDICAL!;
const CREDENTIALS_JSON = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

const storage = new Storage({
  projectId: PROJECT_ID,
  credentials: CREDENTIALS_JSON ? JSON.parse(CREDENTIALS_JSON) : undefined,
});

export async function POST(req: Request) {
  try {
    const { filename, contentType, sizeBytes } = await req.json();
    if (!filename) return NextResponse.json({ ok: false, error: "filename required" }, { status: 400 });

    const ext = filename.includes(".") ? filename.split(".").pop() : "bin";
    const objectKey = `users/raw/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const file = storage.bucket(BUCKET).file(objectKey);

    const [url] = await file.getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 10 * 60 * 1000,
      contentType: contentType || "application/octet-stream",
    });

    // Try to pre-save metadata; ignore if model differs
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.medicalDocument.create({
        data: {
          objectKey,
          contentType: contentType || "application/octet-stream",
          sizeBytes: sizeBytes || 0,
          // userId: ... (если есть сессия — можно проставить)
        } as any,
      });
    } catch {
      // noop
    }

    return NextResponse.json({ ok: true, uploadUrl: url, objectKey });
  } catch (e) {
    console.error("signed-url error", e);
    return NextResponse.json({ ok: false, error: "failed" }, { status: 500 });
  }
}
