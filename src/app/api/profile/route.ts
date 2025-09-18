import { NextResponse } from "next/server";

/**
 * Temporary profile stub until NextAuth is wired.
 * You can control output via env:
 * - PROFILE_ROLE: "admin" | "user" (default: user)
 * - PROFILE_SPECIAL_CATEGORIES: comma list, e.g. "psychology,longevity"
 */
export async function GET() {
  const role = (process.env.PROFILE_ROLE || "user").toLowerCase();
  const catsStr = process.env.PROFILE_SPECIAL_CATEGORIES || "";
  const categories = catsStr
    .split(",")
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);

  return NextResponse.json({
    ok: true,
    userId: "stub-user",
    role,
    categories,
  });
}
