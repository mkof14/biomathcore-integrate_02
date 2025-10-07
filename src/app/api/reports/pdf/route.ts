import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { buildReport } from "@/lib/reports/build";
import { audit } from "@/lib/logs/audit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const report = buildReport(json);
    await audit("report_pdf_generate", { plan: report.plan, reportId: report.reportId });

    const doc = new PDFDocument({ autoFirstPage: false, info: { Title: report.summary || report.reportId } });
    const chunks: Buffer[] = [];
    doc.on("data", c => chunks.push(c));
    doc.on("end", () => null);

    doc.addPage().fontSize(18).text(`BioMath Core Report`, { underline: true });
    doc.moveDown().fontSize(12).text(`Plan: ${report.plan}`);
    doc.text(`Report ID: ${report.reportId}`);
    doc.text(`Generated: ${new Date(report.generatedAt as any).toString()}`);
    if (report.summary) { doc.moveDown().fontSize(13).text("Summary"); doc.fontSize(11).text(report.summary); }

    for (const s of report.sections) {
      doc.addPage().fontSize(16).text(s.title, { underline: true });
      if (s.description) { doc.moveDown().fontSize(11).text(s.description); }
      if (s.metrics?.length) {
        doc.moveDown().fontSize(13).text("Metrics");
        doc.fontSize(10);
        for (const m of s.metrics) {
          doc.text(`${m.label}: ${m.value ?? "—"}${m.unit ? ` ${m.unit}` : ""}`);
        }
      }
      if (s.tables?.length) {
        for (const t of s.tables) {
          doc.moveDown().fontSize(13).text("Table");
          const rows = [t.columns as any].concat(t.rows as any);
          for (const r of rows) { doc.fontSize(10).text(r.map((c:any)=>String(c ?? "—")).join(" | ")); }
          if (t.note) { doc.fontSize(9).text(`Note: ${t.note}`, { oblique: true }); }
        }
      }
    }

    doc.end();
    const pdf = Buffer.concat(chunks);
    return new NextResponse(pdf, { headers: { "content-type": "application/pdf", "content-disposition": `inline; filename="${report.reportId}.pdf"` } });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error:String(e?.message||e) }, { status: 400 });
  }
}
