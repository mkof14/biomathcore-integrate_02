import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET() {
  const key = process.env.OPENAI_API_KEY || "";
  return NextResponse.json({ ok: true, envLoaded: !!key, keyLen: key.length, model: process.env.AI_MODEL || "gpt-4o-mini" });
}
