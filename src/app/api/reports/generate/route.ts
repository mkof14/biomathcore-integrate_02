import { NextResponse } from "next/server";
import { ReportInputSchema, type ReportInput } from "@/lib/report-engine/contracts/reportSchemas";
import { getReportRepo } from "@/lib/repos/reportRepo";
import { generateReport } from "@/lib/report-engine/geminiGenerate";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as unknown;
    const input = ReportInputSchema.parse(body) as ReportInput;

    const preLines = input.params?.lines;
    const gen = preLines?.length
      ? { title: input.title, lines: preLines, meta: { source: "client" } }
      : await generateReport(input);

    const repo = getReportRepo();
    const row = await repo.create({
      userId: input.userId,
      title: input.title,
      lines: gen.lines,
      meta: { ...(input.params?.meta ?? {}), ...(gen.meta ?? {}) },
    });

    return NextResponse.json({ ok: true, id: row.id, title: row.title });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "bad_request" }, { status: 400 });
  }
}
