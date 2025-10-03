"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Question, TextQuestion, NumberQuestion, Answers, MetricSystem } from "./engine";
import { submitQuestionnaire, loadAnswers, isSensitive, getUserId } from "./engine";
import { nextSlug } from "./flow";

export default function RenderForm({ title, slug, questions }: { title: string; slug: string; questions: Question[] }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({});
  const [metricSystem, setMetricSystem] = useState<MetricSystem>("metric");
  const [anonymous, setAnonymous] = useState<boolean>(isSensitive(slug));

  useEffect(() => { setAnswers(loadAnswers(slug)); setAnonymous(isSensitive(slug)); }, [slug]);

  const progress = useMemo(() => {
    const required = questions.filter(q => q.required);
    const answered = required.filter(q => {
      const v = answers[q.id];
      if (q.type === "boolean") return v === true || v === false;
      return v !== undefined && v !== "";
    });
    return required.length ? Math.round((answered.length / required.length) * 100) : 100;
  }, [answers, questions]);

  const handleChange = (id: string, val: any) => setAnswers(prev => ({ ...prev, [id]: val }));

  const renderQuestion = (q: Question) => {
    if (q.type === "text") {
      return (
        <input
          className="w-full rounded p-2 border bg-white/90 text-black"
          placeholder={q.placeholder}
          value={(answers[q.id] as string) || ""}
          onChange={e => handleChange(q.id, e.target.value)}
        />
      );
    }
    if (q.type === "textarea") {
      return (
        <textarea
          className="w-full rounded p-2 border bg-white/90 text-black"
          placeholder={q.placeholder}
          rows={(q as TextQuestion).rows || 3}
          value={(answers[q.id] as string) || ""}
          onChange={e => handleChange(q.id, e.target.value)}
        />
      );
    }
    if (q.type === "number") {
      const nq = q as NumberQuestion;
      const unit = metricSystem === "metric" ? nq.unitMetric : nq.unitImperial;
      return (
        <div className="flex gap-2 items-center">
          <input
            type="number"
            className="flex-1 rounded p-2 border bg-white/90 text-black"
            min={nq.min}
            max={nq.max}
            step={nq.step}
            value={String(answers[q.id] ?? "")}
            onChange={e => handleChange(q.id, e.target.value)}
          />
          {unit && <span className="text-slate-600">{unit}</span>}
        </div>
      );
    }
    if (q.type === "select") {
      // @ts-ignore
      const opts = q.options as {value:string;label:string}[];
      return (
        <select
          className="w-full rounded p-2 border bg-white/90 text-black"
          value={(answers[q.id] as string) || ""}
          onChange={e => handleChange(q.id, e.target.value)}
        >
          <option value="">Select…</option>
          {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      );
    }
    if (q.type === "boolean") {
      const v = answers[q.id];
      return (
        <div className="inline-flex gap-2">
          <button type="button" className={`px-3 py-1 rounded ${v === true ? "bg-sky-400" : "bg-slate-200"} text-black`} onClick={() => handleChange(q.id, true)}>Yes</button>
          <button type="button" className={`px-3 py-1 rounded ${v === false ? "bg-sky-400" : "bg-slate-200"} text-black`} onClick={() => handleChange(q.id, false)}>No</button>
        </div>
      );
    }
    return null;
  };

  const handleSubmit = async () => {
    const required = questions.filter(q => q.required);
    const missing = required.filter(q => {
      const v = answers[q.id];
      if (q.type === "boolean") return !(v === true || v === false);
      return v === undefined || v === "";
    });
    if (missing.length > 0) { alert("Please complete required fields"); return; }
    const meta: Answers = { _anonymous: anonymous, _respondentId: getUserId() };
    const res = await submitQuestionnaire(slug, { answers: { ...answers, ...meta } });
    if (res.ok) {
      const next = nextSlug(slug);
      if (next) router.push(`/member/questionnaires/${next}`); else router.push("/member/dashboard");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{title}</h1>

      {isSensitive(slug) && (
        <div className="rounded border p-3 bg-white/80 text-black">
          <div className="flex items-center justify-between">
            <div>Responding as: <span className="font-semibold">{anonymous ? `User ID ${getUserId()}` : "Name on file"}</span></div>
            <button type="button" className={`px-3 py-1 rounded ${anonymous ? "bg-sky-400" : "bg-slate-200"} text-black`} onClick={() => setAnonymous(!anonymous)}>
              {anonymous ? "Use Name" : "Use Anonymous ID"}
            </button>
          </div>
        </div>
      )}

      <div className="w-full bg-slate-200 rounded h-3">
        <div className="bg-gradient-to-r from-sky-400 to-emerald-400 h-3 rounded" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex gap-4 items-center">
        <span>Units:</span>
        <button className={`px-3 py-1 rounded ${"metric" === metricSystem ? "bg-sky-400" : "bg-slate-200"} text-black`} onClick={() => setMetricSystem("metric")}>Metric</button>
        <button className={`px-3 py-1 rounded ${"imperial" === metricSystem ? "bg-sky-400" : "bg-slate-200"} text-black`} onClick={() => setMetricSystem("imperial")}>Imperial</button>
      </div>

      {questions.map(q => (
        <div key={q.id} className="space-y-2">
          <label className="font-medium">{q.label}{q.required && <span className="text-red-500">*</span>}</label>
          {renderQuestion(q)}
        </div>
      ))}

      <div className="flex justify-between pt-4">
        
        <button className="px-6 py-3 bg-gradient-to-r from-sky-400 to-emerald-400 text-black font-semibold rounded" onClick={handleSubmit}>Continue →</button>
      </div>
    </div>
  );
}
