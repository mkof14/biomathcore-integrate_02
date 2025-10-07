/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const results = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Finance", href: "/admin/finance" },
    { label: "Users", href: "/admin/users" },
    { label: "Devices", href: "/admin/devices" },
    { label: "Monitoring", href: "/admin/monitoring" },
    { label: "Behavior", href: "/admin/behavior" },
    { label: "Alerts", href: "/admin/alerts" },
    { label: "Settings", href: "/admin/settings" },
  ].filter((x) => x.label.toLowerCase().includes(q));
  return NextResponse.json({ results });
}
