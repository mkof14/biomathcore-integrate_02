import { NextResponse } from "next/server";
import { setUserPlan } from "@/lib/hbx/plans";
export const runtime = "nodejs";
export async function POST(req: Request) {
  const { userId, plan } = await req.json().catch(() => ({}));
  if (!userId || !plan)
    return NextResponse.json(
      { ok: false, error: "userId_and_plan_required" },
      { status: 400 },
    );
  setUserPlan(userId, plan);
  return NextResponse.json({ ok: true });
}
