"use client";
import { useState } from "react";
import { FileText } from "lucide-react";

type Opinion = {
  bullets: string[];
  summary: string;
};

function sampleOpinions(): Opinion[] {
  return [
    {
      bullets: [
        "Identifies near-term risks and clear next steps.",
        "Grounded in validated markers and guidelines.",
        "Emphasizes adherence and measurable outcomes.",
      ],
      summary:
        "Opinion A recommends a structured plan focused on clinically validated actions and short-term measurables.",
    },
    {
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

  return (
    <section className="mt-10 space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-slate-400" />
          <h2 className="text-xl font-semibold">
            Second Opinion — Dual AI Reports
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300/90">
          Two independent AI perspectives review the same inputs and present
          complementary conclusions. Compare them side-by-side, merge insights,
          and export a combined action plan. This mirrors a real second-opinion
          workflow and helps reduce blind spots while improving confidence in
          the next step.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200/60 bg-white/80 dark:bg-slate-900/40 backdrop-blur-md shadow-md">
          <div className="rounded-t-3xl p-4 text-white bg-gradient-to-r from-slate-700 via-slate-600 to-slate-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-white/15 ring-1 ring-white/30 grid place-items-center text-white text-sm font-semibold">
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
              <div className="space-y-3">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {opinions[0].summary}
                </p>
                <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300">
                  {opinions[0].bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/60 bg-white/80 dark:bg-slate-900/40 backdrop-blur-md shadow-md">
          <div className="rounded-t-3xl p-4 text-white bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-white/15 ring-1 ring-white/30 grid place-items-center text-white text-sm font-semibold">
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
              <div className="space-y-3">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {opinions[1].summary}
                </p>
                <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300">
                  {opinions[1].bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/60 p-4 text-sm text-slate-600 dark:text-slate-300/90">
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Orientation
            </div>
            <div>Opinion A — structured & validated</div>
            <div>Opinion B — exploratory & preventive</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">
              How to use
            </div>
            <div>
              Start with A for immediate steps, enrich with B for long-term
              levers.
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Outcome
            </div>
            <div>Balanced plan with clarity now and optional depth later.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
