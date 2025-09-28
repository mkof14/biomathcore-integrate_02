import { NextResponse } from "next/server";
import { hbxStore } from "@/lib/hbx/store.memory";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "U1001";
  const u = hbxStore.usage(userId);
  return NextResponse.json({ ok: true, usage: u });
}
