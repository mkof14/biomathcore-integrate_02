import { NextResponse } from "next/server";
import { getReportRepo } from "@/lib/repos/reportRepo";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const userId = body?.userId || "U1001";
  const title = body?.title || "Untitled";
  const lines = Array.isArray(body?.lines)
    ? body.lines
    : process.env.REPORTS_MOCK
      ? [
          `(${title}) mock line 1`,
          `(${title}) mock line 2`,
          `(${title}) mock line 3`,
        ]
      : [];
  const meta =
    body?.meta ??
    (process.env.REPORTS_MOCK
      ? { source: "mock", reason: "FORCED", mock: true }
      : {});

  const repo = getReportRepo();
  const created = await repo.create({ userId, title, lines, meta });
  return NextResponse.json({ ok: true, id: created.id, title: created.title });
}
