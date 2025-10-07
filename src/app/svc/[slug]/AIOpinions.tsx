"use client";
import { useState, useMemo } from "react";
import {
  Scale,
  BadgeCheck,
  Lightbulb,
  FileOutput,
  FileDown,
} from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";

type Opinion = {
  title: "Opinion A" | "Opinion B";
  bullets: string[];
  summary: string;
};

function sampleOpinions(): Opinion[] {
  return [
    {
      title: "Opinion A",
      bullets: [
        "Identifies near-term risks and clear next steps.",
        "Grounded in validated markers and guidelines.",
        "Emphasizes adherence and measurable outcomes.",
      ],
      summary:
        "Opinion A recommends a structured plan focused on clinically validated actions and short-term measurables.",
    },
    {
      title: "Opinion B",
      bullets: [
        "Explores optional adjuncts and long-term levers.",
        "Surfaces data gaps and suggests what to track next.",
        "Highlights prevention and sustainable habits.",
      ],
      summary:
        "Opinion B offers an exploratory angle with prevention tactics and monitoring cadence to inform future decisions.",
    },
  ];
}

export default function AIOpinions({ serviceTitle }: { serviceTitle: string }) {
  const [aReady, setAReady] = useState(false);
  const [bReady, setBReady] = useState(false);
  const opinions = sampleOpinions();

  const combined = useMemo(() => {
    const enabled = [
      aReady ? opinions[0] : null,
      bReady ? opinions[1] : null,
    ].filter(Boolean) as Opinion[];

    const mergedBullets = enabled.flatMap((op) => op.bullets);
    const summary = enabled
      .map((op) => `${op.title}: ${op.summary}`)
      .join("\n\n");
    return { enabled, mergedBullets, summary };
  }, [aReady, bReady, opinions]);

  function downloadMerged(format: "pdf" | "md" | "json" = "pdf") {
    const payload = {
      service: serviceTitle,
      opinions: opinions.map((o) => ({
        title: o.title,
        summary: o.summary,
        bullets: o.bullets,
      })),
      selected: {
        aReady,
        bReady,
      },
      merged: {
        summary: combined.summary,
        bullets: combined.mergedBullets,
      },
      generatedAt: new Date().toISOString(),
    };

    if (format === "json") {
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${serviceTitle.replace(/\s+/g, "-").toLowerCase()}-dual-ai-report.json`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      a.remove();
      return;
    }

    if (format === "md") {
      const md = [
        `# ${serviceTitle} — Dual AI Report`,
        ``,
        `## Selected Opinions`,
        aReady ? `- Opinion A ✅` : `- Opinion A ⏳`,
        bReady ? `- Opinion B ✅` : `- Opinion B ⏳`,
        ``,
        `## Combined Summary`,
        combined.summary || "_Generate opinions to see combined summary._",
        ``,
        `## Combined Action Points`,
        ...(combined.mergedBullets.length
          ? combined.mergedBullets.map((b) => `- ${b}`)
          : ["_No items yet_"]),
        ``,
      ].join("\n");
      const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${serviceTitle.replace(/\s+/g, "-").toLowerCase()}-dual-ai-report.md`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      a.remove();
      return;
    }

    // PDF (default)
    const doc = new jsPDF({ unit: "pt" });
    const margin = 48;
    let y = margin;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`${serviceTitle} — Dual AI Report`, margin, y);
    y += 20;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y);
    y += 20;

    doc.setFont("helvetica", "bold");
    doc.text("Selected Opinions", margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.text(aReady ? "• Opinion A ✓" : "• Opinion A …", margin, y);
    y += 14;
    doc.text(bReady ? "• Opinion B ✓" : "• Opinion B …", margin, y);
    y += 20;

    doc.setFont("helvetica", "bold");
    doc.text("Combined Summary", margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    const summaryLines = doc.splitTextToSize(
      combined.summary || "Generate opinions to see combined summary.",
      540,
    );
    summaryLines.forEach((line) => {
      doc.text(line, margin, y);
      y += 14;
    });
    y += 8;

    doc.setFont("helvetica", "bold");
    doc.text("Combined Action Points", margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    if (combined.mergedBullets.length) {
      combined.mergedBullets.forEach((b) => {
        const lines = doc.splitTextToSize(`• ${b}`, 540);
        lines.forEach((line) => {
          doc.text(line, margin, y);
          y += 14;
        });
      });
    } else {
      doc.text("No items yet.", margin, y);
      y += 14;
    }

    doc.save(
      `${serviceTitle.replace(/\s+/g, "-").toLowerCase()}-dual-ai-report.pdf`,
    );
  }

  return (
    <section className="mt-10 space-y-6">
      {/* Header: new emblem + two distinct calm colors */}
      <motion.header
        className="space-y-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4">
          {/* Emblem: balanced scales, indigo/amber duotone */}
          <motion.div
            className="btn-nasa"
            initial={{ scale: 0.9, rotate: -2, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Scale className="h-7 w-7 text-amber-300" />
            <span className="btn-nasa"></span>
            <span className="btn-nasa"></span>
          </motion.div>
          <div>
            <h2 className="text-2xl font-extrabold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-violet-700 dark:from-indigo-300 dark:to-violet-300">
                Second Opinion
              </span>
              <span className="text-slate-700 dark:text-slate-200"> — </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-orange-700 dark:from-amber-300 dark:to-orange-300">
                Dual AI Reports
              </span>
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300/90">
              Two independent AI perspectives review the same inputs and present
              complementary conclusions. Compare side-by-side, then merge
              insights into a single actionable summary.
            </p>
          </div>
        </div>

        {/* Quick-glance explainer chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="btn-nasa">
            <BadgeCheck className="h-3.5 w-3.5 text-indigo-700 dark:text-indigo-300" />{" "}
            Evidence-focused
          </span>
          <span className="btn-nasa">
            <Lightbulb className="h-3.5 w-3.5 text-amber-700 dark:text-amber-300" />{" "}
            Alternative pathways
          </span>
          <span className="btn-nasa">
            <FileOutput className="h-3.5 w-3.5 text-indigo-700 dark:text-indigo-300" />{" "}
            Merge & export
          </span>
        </div>
      </motion.header>

      {/* Two animated cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Opinion A */}
        <motion.div
          className="rounded-3xl border border-slate-200/70 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/40 backdrop-blur-md shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <div className="btn-nasa">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="btn-nasa">
                  A
                </div>
                <span className="font-semibold">Opinion A</span>
              </div>
              <button
                onClick={() => setAReady(true)}
                className="rounded-md bg-white/20 px-3 py-1 text-sm hover:bg-white/30"
              >
                Generate
              </button>
            </div>
          </div>
          <div className="p-5">
            {!aReady ? (
              <p className="text-sm text-slate-500">
                Click Generate to produce this opinion.
              </p>
            ) : (
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {opinions[0].summary}
                </p>
                <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300">
                  {opinions[0].bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Opinion B */}
        <motion.div
          className="rounded-3xl border border-slate-200/70 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/40 backdrop-blur-md shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <div className="btn-nasa">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="btn-nasa">
                  B
                </div>
                <span className="font-semibold">Opinion B</span>
              </div>
              <button
                onClick={() => setBReady(true)}
                className="rounded-md bg-white/20 px-3 py-1 text-sm hover:bg-white/30"
              >
                Generate
              </button>
            </div>
          </div>
          <div className="p-5">
            {!bReady ? (
              <p className="text-sm text-slate-500">
                Click Generate to produce this opinion.
              </p>
            ) : (
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {opinions[1].summary}
                </p>
                <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300">
                  {opinions[1].bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Merge & Download */}
      <motion.div
        className="flex flex-wrap items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.15 }}
      >
        <button
          onClick={() => downloadMerged("pdf")}
          className="btn-nasa"
        >
          <FileDown className="h-4 w-4" /> Merge & Download (PDF)
        </button>
        <button
          onClick={() => downloadMerged("md")}
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/30"
        >
          <FileDown className="h-4 w-4" /> Markdown
        </button>
        <button
          onClick={() => downloadMerged("json")}
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/30"
        >
          <FileDown className="h-4 w-4" /> JSON
        </button>
        <span className="text-xs text-slate-500">
          {combined.enabled.length === 0
            ? "Tip: generate opinions to enrich the merged report."
            : "Ready: merged content includes generated opinions."}
        </span>
      </motion.div>
    </section>
  );
}
