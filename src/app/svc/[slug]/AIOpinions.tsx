"use client";
import { useState } from "react";
import { Bot, Brain, FileText } from "lucide-react";

type Opinion = {
  model: "OpenAI" | "Gemini";
  color: string;
  gradient: string;
  bullets: string[];
  summary: string;
};

function sampleOpinions(service: string): Opinion[] {
  return [
    {
      model: "OpenAI",
      color: "from-sky-500 to-teal-400",
      gradient: "bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500",
      bullets: [
        "Key risks identified and prioritized.",
        "Personalized next steps based on your inputs.",
        "Evidence references mapped to clinical guidelines.",
      ],
      summary:
        "OpenAI proposes a conservative plan with strong emphasis on validated biomarkers and adherence coaching.",
    },
    {
      model: "Gemini",
      color: "from-fuchsia-500 to-purple-500",
      gradient: "bg-gradient-to-r from-fuchsia-600 via-pink-500 to-purple-600",
      bullets: [
        "Explores adjunct options and lifestyle levers.",
        "Highlights long-term optimizations and prevention.",
        "Surfaces data gaps and suggests what to measure next.",
      ],
      summary:
        "Gemini suggests a more exploratory plan with optional biohacking modules and monitoring cadence.",
    },
  ];
}

export default function AIOpinions({ serviceTitle }: { serviceTitle: string }) {
  const [openAIReady, setOpenAIReady] = useState(false);
  const [geminiReady, setGeminiReady] = useState(false);
  const opinions = sampleOpinions(serviceTitle);

  return (
    <section className="mt-8 space-y-6">
      <header className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-slate-400" />
        <h2 className="text-xl font-semibold">
          Second Opinion — Dual AI Reports
        </h2>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* OpenAI */}
        <div className="rounded-3xl border border-slate-200/50 bg-white/80 dark:bg-slate-900/40 backdrop-blur-md shadow-md">
          <div
            className={`rounded-t-3xl p-4 text-white ${opinions[0].gradient}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <span className="font-semibold">Opinion A — OpenAI</span>
              </div>
              <button
                onClick={() => setOpenAIReady(true)}
                className="rounded-md bg-white/20 px-3 py-1 text-sm hover:bg-white/30"
              >
                Generate
              </button>
            </div>
          </div>
          <div className="p-5">
            {!openAIReady ? (
              <p className="text-sm text-slate-500">
                Click Generate to produce OpenAI opinion.
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

        {/* Gemini */}
        <div className="rounded-3xl border border-slate-200/50 bg-white/80 dark:bg-slate-900/40 backdrop-blur-md shadow-md">
          <div
            className={`rounded-t-3xl p-4 text-white ${opinions[1].gradient}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                <span className="font-semibold">Opinion B — Gemini</span>
              </div>
              <button
                onClick={() => setGeminiReady(true)}
                className="rounded-md bg-white/20 px-3 py-1 text-sm hover:bg-white/30"
              >
                Generate
              </button>
            </div>
          </div>
          <div className="p-5">
            {!geminiReady ? (
              <p className="text-sm text-slate-500">
                Click Generate to produce Gemini opinion.
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

      {/* Compare strip */}
      <div className="rounded-2xl border border-slate-200/60 p-4 text-sm text-slate-600 dark:text-slate-300/90">
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Focus
            </div>
            <div>OpenAI — validated care & adherence</div>
            <div>Gemini — exploration & prevention</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Tone
            </div>
            <div>Structured, conservative</div>
            <div>Creative, forward-looking</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Use Together
            </div>
            <div>Combine to get balanced plan and second opinion.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
