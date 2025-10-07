"use client";
import "./qnr.light.css";

import React, { useEffect, useMemo, useState } from "react";
import type { ModuleConfig } from "@/modules/questionnaires/types";

type Props = {
  modules: ModuleConfig[];
  initialMetric?: "percent" | "score" | "level";
  storageKey?: string;
  onSubmit?: (payload: {
    answers: Record<string, string | number>;
    metricMode: "percent" | "score" | "level";
    elapsedSec?: number;
    changes?: number;
  }) => Promise<void> | void;
  layout?: "single" | "paged";
};

function formatDobInput(v: string) {
  const d = v.replace(/[^0-9]/g, "").slice(0, 8);
  if (d.length <= 4) return d;
  if (d.length <= 6) return d.slice(0, 4) + "-" + d.slice(4);
  return d.slice(0, 4) + "-" + d.slice(4, 6) + "-" + d.slice(6, 8);
}

export default function QuestionnaireEngine({
  modules,
  initialMetric = "percent",
  storageKey = "bmc.qnr",
  onSubmit,
  layout = "single",
}: Props) {
  const [answers, setAnswers] = useState<Record<string, any>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(window.localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  });
  const [metricMode, setMetricMode] = useState<"percent" | "score" | "level">(
    initialMetric,
  );
  const [changes, setChanges] = useState(0);
  const [startedAt] = useState<number>(() => Date.now());

  useEffect(() => {
    try {
      if (typeof window !== "undefined")
        window.localStorage.setItem(storageKey, JSON.stringify(answers));
    } catch {}
  }, [answers, storageKey]);

  const totals = useMemo(() => {
    const flat = modules.flatMap((m) => m.questions as any[]);
    const qTotal = flat.length;
    const reqTotal = flat.filter((q) => q.required || q.requiredIf).length;
    let reqAnswered = 0;
    for (const q of flat) {
      if (!isVisible(q, answers)) continue;
      const req = q.required || requiredIf(q, answers);
      if (!req) continue;
      const v = answers[q.id];
      if (v !== undefined && v !== null && String(v).trim() !== "")
        reqAnswered++;
    }
    return { qTotal, reqTotal, reqAnswered };
  }, [modules, answers]);

  const progress = Math.round(
    (Object.keys(answers).length / Math.max(totals.qTotal, 1)) * 100,
  );
  const requiredProgress = Math.round(
    (totals.reqAnswered / Math.max(totals.reqTotal, 1)) * 100,
  );

  function setValue(id: string, value: any) {
    setAnswers((prev) => {
      if (prev[id] === value) return prev;
      const next = { ...prev, [id]: value };
      setChanges((c) => c + 1);
      return next;
    });
  }

  function validateAll(): {
    ok: boolean;
    firstError?: { moduleTitle: string; label: string };
  } {
    for (const m of modules) {
      for (const q of m.questions as any[]) {
        if (!isVisible(q, answers)) continue;
        const req = q.required || requiredIf(q, answers);
        const v = answers[q.id];
        if (req && (v === undefined || v === null || String(v).trim() === "")) {
          return {
            ok: false,
            firstError: {
              moduleTitle: m.title || m.key,
              label: q.label || q.id,
            },
          };
        }
        if (q.validate?.pattern && v) {
          try {
            const re = new RegExp(q.validate.pattern);
            if (!re.test(String(v))) {
              return {
                ok: false,
                firstError: {
                  moduleTitle: m.title || m.key,
                  label: q.validate.message || q.label || q.id,
                },
              };
            }
          } catch {}
        }
      }
    }
    return { ok: true };
  }

  async function submit() {
    const v = validateAll();
    if (!v.ok) {
      alert(
        "Please complete: " +
          v.firstError!.moduleTitle +
          " → " +
          v.firstError!.label,
      );
      return;
    }
    const elapsedSec = Math.round((Date.now() - startedAt) / 1000);
    if (onSubmit) await onSubmit({ answers, metricMode, elapsedSec, changes });
  }

  function gridCols(): React.CSSProperties {
    if (typeof window === "undefined") return { gridTemplateColumns: "1fr" };
    const w = window.innerWidth;
    if (w >= 1440) return { gridTemplateColumns: "1fr 1fr 1fr" };
    if (w >= 960) return { gridTemplateColumns: "1fr 1fr" };
    return { gridTemplateColumns: "1fr" };
  }

  return (
    <div className="qnr-root">
      <div
        className="mx-auto"
        style={{ maxWidth: 1200, padding: "24px 24px 80px 24px" }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 5,
            backdropFilter: "blur(2px)",
          }}
          className="py-3 mb-6"
        >
          <div
            className="text-sm opacity-90"
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div>Progress: {progress}%</div>
            <div>Required: {requiredProgress}%</div>
            <div>
              Questions: {Object.keys(answers).length}/{totals.qTotal}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span>Metric:</span>
              <label
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <input
                  type="radio"
                  name="metricMode"
                  checked={metricMode === "percent"}
                  onChange={() => setMetricMode("percent")}
                />{" "}
                <span>%</span>
              </label>
              <label
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <input
                  type="radio"
                  name="metricMode"
                  checked={metricMode === "score"}
                  onChange={() => setMetricMode("score")}
                />{" "}
                <span>Score</span>
              </label>
              <label
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <input
                  type="radio"
                  name="metricMode"
                  checked={metricMode === "level"}
                  onChange={() => setMetricMode("level")}
                />{" "}
                <span>Level</span>
              </label>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <div className="flex flex-col gap-10">
            {modules.map((mod) => (
              <fieldset
                key={mod.key}
                style={{
                  border: "1px solid var(--qa-fieldset-border)",
                  borderRadius: 12,
                  padding: 20,
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <legend
                  style={{
                    padding: "0 8px",
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  {mod.title || mod.key}
                </legend>
                {mod.description && (
                  <p className="mb-4 text-sm opacity-80">{mod.description}</p>
                )}

                <div
                  className="grid gap-4"
                  style={{ display: "grid", ...gridCols() }}
                >
                  {(mod.questions as any[])
                    .filter((q) => isVisible(q, answers))
                    .map((q) => (
                      <div key={q.id} className="flex flex-col gap-2">
                        <label className="text-sm">
                          {q.label || q.id}
                          {q.required || requiredIf(q, answers) ? " *" : ""}
                        </label>

                        {q.type === "text" && (
                          <input
                            type="text"
                            defaultValue={answers[q.id] ?? ""}
                            onChange={(e: any) =>
                              setValue(q.id, e.target.value)
                            }
                            placeholder={q.placeholder || ""}
                            className="w-full qa-input"
                            style={{
                              padding: "10px 12px",
                              border: "1px solid var(--qa-border)",
                              borderRadius: 8,
                              background: "var(--qa-input-bg)",
                              opacity: 0.98,
                            }}
                          />
                        )}

                        {q.type === "textarea" && (
                          <textarea
                            defaultValue={answers[q.id] ?? ""}
                            onChange={(e: any) =>
                              setValue(q.id, e.target.value)
                            }
                            placeholder={q.placeholder || ""}
                            className="w-full qa-input"
                            style={{
                              minHeight: 96,
                              padding: "10px 12px",
                              border: "1px solid var(--qa-border)",
                              borderRadius: 8,
                              background: "var(--qa-input-bg)",
                              opacity: 0.98,
                            }}
                          />
                        )}

                        {q.type === "select" && Array.isArray(q.options) && (
                          <select
                            defaultValue={answers[q.id] ?? ""}
                            onChange={(e: any) =>
                              setValue(q.id, e.target.value)
                            }
                            className="w-full qa-input"
                            style={{
                              padding: "10px 12px",
                              border: "1px solid var(--qa-border)",
                              borderRadius: 8,
                              background: "var(--qa-input-bg)",
                              opacity: 0.98,
                            }}
                          >
                            <option value="">Select…</option>
                            {q.options.map((opt: any) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label ?? opt.value}
                              </option>
                            ))}
                          </select>
                        )}

                        {q.help && (
                          <div className="text-xs opacity-80">{q.help}</div>
                        )}
                      </div>
                    ))}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between gap-4 text-sm flex-wrap">
            <div className="text-xs opacity-70">
              Saved locally • {Object.keys(answers).length} / {totals.qTotal}{" "}
              answers
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function isVisible(q: any, answers: Record<string, any>): boolean {
  if (!q?.visibleIf && !q?.requiredIf) return true;
  const cond = q.visibleIf || q.requiredIf;
  if (!cond?.when || !Array.isArray(cond?.is)) return true;
  return cond.is.includes(String(answers[cond.when] ?? ""));
}
function requiredIf(q: any, answers: Record<string, any>): boolean {
  if (!q?.requiredIf) return false;
  const cond = q.requiredIf;
  if (!cond?.when || !Array.isArray(cond?.is)) return false;
  return cond.is.includes(String(answers[cond.when] ?? ""));
}
