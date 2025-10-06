/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
export const runtime = "nodejs";
const COOKIE = "adminrole";

export async function GET() {
  return NextResponse.json({ role: "SuperAdmin" });
}
export async function POST(req: Request) {
  const { role } = await req.json().catch(() => ({
    /* TODO: implement or remove */
  }));
  if (!role) return NextResponse.json({ ok: false }, { status: 400 });
  const res = NextResponse.json({ ok: true, role });
  res.cookies.set(COOKIE, String(role), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
