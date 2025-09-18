import { NextResponse } from "next/server";

function getCookie(name: string, cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const s = part.trim();
    const eq = s.indexOf("=");
    if (eq === -1) continue;
    if (s.slice(0, eq) === name) return s.slice(eq + 1);
  }
  return null;
}

export async function GET(req: Request) {
  const raw = getCookie("bmc.selected", req.headers.get("cookie")) ?? "[]";
  let selected: string[] = [];
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    selected = Array.isArray(parsed) ? parsed : [];
  } catch { selected = []; }

  return NextResponse.json({
    ok: true,
    email: "demo@biomath.core",
    plan: { name: "Core", price: 19 },
    selected,
  });
}
