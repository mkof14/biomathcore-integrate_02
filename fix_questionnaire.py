from pathlib import Path
root = Path("src")

# 1) types.ts — добавим поддержку textarea
t = root / "modules/questionnaires/types.ts"
txt = t.read_text(encoding="utf-8")
if 'type: "text" | "textarea"' not in txt:
    txt = txt.replace('type: "text";', 'type: "text" | "textarea";')
    t.write_text(txt, encoding="utf-8")

# 2) Перезапишем движок классической одностраничной анкетой с локальной "classic-light"
eng = root / "modules/questionnaires/engine/QuestionnaireEngine.tsx"
eng.parent.mkdir(parents=True, exist_ok=True)
eng.write_text(r'''
"use client";

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

export default function QuestionnaireEngine({
  modules,
  initialMetric = "percent",
  storageKey = "bmc.qnr",
  onSubmit,
  layout = "single",
}: Props) {
  const [answers, setAnswers] = useState<Record<string, any>>(() => {
    if (typeof window === "undefined") return {};
    try { return JSON.parse(window.localStorage.getItem(storageKey) || "{}"); } catch { return {}; }
  });
  const [metricMode] = useState<"percent" | "score" | "level">(initialMetric);
  const [changes, setChanges] = useState(0);
  const [startedAt] = useState<number>(() => Date.now());

  useEffect(() => {
    try { if (typeof window !== "undefined") window.localStorage.setItem(storageKey, JSON.stringify(answers)); } catch {}
  }, [answers, storageKey]);

  const totals = useMemo(() => {
    const flat = modules.flatMap(m => m.questions as any[]);
    const qTotal = flat.length;
    const reqTotal = flat.filter(q => q.required || q.requiredIf).length;
    let reqAnswered = 0;
    for (const q of flat) {
      if (!isVisible(q, answers)) continue;
      const req = q.required || requiredIf(q, answers);
      if (!req) continue;
      const v = answers[q.id];
      if (v !== undefined && v !== null && String(v).trim() !== "") reqAnswered++;
    }
    return { qTotal, reqTotal, reqAnswered };
  }, [modules, answers]);

  const progress = Math.round((Object.keys(answers).length / Math.max(totals.qTotal, 1)) * 100);
  const requiredProgress = Math.round((totals.reqAnswered / Math.max(totals.reqTotal, 1)) * 100);

  function setValue(id: string, value: any) {
    setAnswers((prev) => {
      if (prev[id] === value) return prev;
      const next = { ...prev, [id]: value };
      setChanges((c) => c + 1);
      return next;
    });
  }

  function validateAll(): { ok: boolean; firstError?: { moduleTitle: string; label: string } } {
    for (const m of modules) {
      for (const q of m.questions as any[]) {
        if (!isVisible(q, answers)) continue;
        const req = q.required || requiredIf(q, answers);
        const v = answers[q.id];
        if (req && (v === undefined || v === null || String(v).trim() === "")) {
          return { ok: false, firstError: { moduleTitle: m.title || m.key, label: q.label || q.id } };
        }
        if (q.validate?.pattern && v) {
          try {
            const re = new RegExp(q.validate.pattern);
            if (!re.test(String(v))) {
              return { ok: false, firstError: { moduleTitle: m.title || m.key, label: q.validate.message || (q.label || q.id) } };
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
      alert("Please complete: " + v.firstError!.moduleTitle + " → " + v.firstError!.label);
      return;
    }
    const elapsedSec = Math.round((Date.now() - startedAt) / 1000);
    if (onSubmit) await onSubmit({ answers, metricMode, elapsedSec, changes });
  }

  function gridCols(): React.CSSProperties {
    if (typeof window === "undefined") return { gridTemplateColumns: "1fr" };
    const w = window.innerWidth;
    if (w >= 1440) return { gridTemplateColumns: "1fr 1fr 1fr" };
    if (w >= 960)  return { gridTemplateColumns: "1fr 1fr" };
    return { gridTemplateColumns: "1fr" };
  }

  return (
    <div className="w-full" style={{
      // локальные переменные — светлее поля/рамки только в анкете
      ["--qa-border" as any]: "rgba(255,255,255,0.45)",
      ["--qa-fieldset-border" as any]: "rgba(255,255,255,0.35)",
      ["--qa-input-bg" as any]: "rgba(255,255,255,0.12)"
    }}>
      <div className="mx-auto" style={{ maxWidth: 1200, padding: "24px 24px 80px 24px" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 5, backdropFilter: "blur(2px)" }} className="py-3 mb-6">
          <div className="text-sm opacity-90" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div>Progress: {progress}%</div>
            <div>Required: {requiredProgress}%</div>
            <div>Metric: {metricMode}</div>
            <div>Questions: {Object.keys(answers).length}/{totals.qTotal}</div>
          </div>
        </div>

        <style>{`
          .qa-input{transition:box-shadow .15s ease,border-color .15s ease}
          .qa-input:focus{outline:none;border-color:rgba(255,255,255,.6); box-shadow:0 0 0 2px rgba(255,255,255,.22)}
          fieldset{backdrop-filter:saturate(1.05)}
        `}</style>

        <form onSubmit={(e)=>{e.preventDefault(); void submit();}}>
          <div className="flex flex-col gap-10">
            {modules.map((mod) => (
              <fieldset key={mod.key} style={{ border: "1px solid var(--qa-fieldset-border)", borderRadius: 12, padding: 20, background: "rgba(255,255,255,0.06)" }}>
                <legend style={{ padding: "0 8px", fontSize: "1rem" }}>{mod.title || mod.key}</legend>
                {mod.description && <p className="mb-4 text-sm opacity-80">{mod.description}</p>}

                <div className="grid gap-4" style={{ display: "grid", ...gridCols() }}>
                  {(mod.questions as any[]).filter(q => isVisible(q, answers)).map((q) => (
                    <div key={q.id} className="flex flex-col gap-2">
                      <label className="text-sm">
                        {q.label || q.id}{(q.required || requiredIf(q, answers)) ? " *" : ""}
                      </label>

                      {q.type === "text" && (
                        <input
                          type="text"
                          defaultValue={answers[q.id] ?? ""}
                          onChange={(e) => setValue(q.id, e.target.value)}
                          placeholder={q.placeholder || ""}
                          className="w-full qa-input"
                          style={{ padding: "10px 12px", border: "1px solid var(--qa-border)", borderRadius: 8, background: "var(--qa-input-bg)", opacity: 0.98 }}
                        />
                      )}

                      {q.type === "textarea" && (
                        <textarea
                          defaultValue={answers[q.id] ?? ""}
                          onChange={(e) => setValue(q.id, e.target.value)}
                          placeholder={q.placeholder || ""}
                          className="w-full qa-input"
                          style={{ minHeight: 96, padding: "10px 12px", border: "1px solid var(--qa-border)", borderRadius: 8, background: "var(--qa-input-bg)", opacity: 0.98 }}
                        />
                      )}

                      {q.type === "select" && Array.isArray(q.options) && (
                        <select
                          defaultValue={answers[q.id] ?? ""}
                          onChange={(e) => setValue(q.id, e.target.value)}
                          className="w-full qa-input"
                          style={{ padding: "10px 12px", border: "1px solid var(--qa-border)", borderRadius: 8, background: "var(--qa-input-bg)", opacity: 0.98 }}
                        >
                          <option value="">Select…</option>
                          {q.options.map((opt: any) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label ?? opt.value}
                            </option>
                          ))}
                        </select>
                      )}

                      {q.help && <div className="text-xs opacity-80">{q.help}</div>}
                    </div>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between gap-4 text-sm flex-wrap">
            <div className="text-xs opacity-70">Saved locally • {Object.keys(answers).length} / {totals.qTotal} answers</div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function isVisible(q: any, answers: Record<string, any>): boolean {
  if (!q?.visibleIf && !q?.requiredIf) return true;
  const cond = (q.visibleIf || q.requiredIf);
  if (!cond?.when || !Array.isArray(cond?.is)) return true;
  return cond.is.includes(String(answers[cond.when] ?? ""));
}
function requiredIf(q: any, answers: Record<string, any>): boolean {
  if (!q?.requiredIf) return false;
  const cond = q.requiredIf;
  if (!cond?.when || !Array.isArray(cond?.is)) return false;
  return cond.is.includes(String(answers[cond.when] ?? ""));
}
''', encoding="utf-8")

# 3) Заполним базовые секции вопросами (если файлов нет, создаём/перезаписываем)
def write(path: Path, content: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")

write(root / "modules/questionnaires/modules/base/medicalHistory.ts", '''
import type { ModuleConfig } from "@/modules/questionnaires/types";
export function baseMedicalHistoryModule(): ModuleConfig {
  return { key:"base_medical_history", title:"Medical history", description:"Chronic conditions, past diagnoses, surgeries.", questions:[
    { id:"mh.conditions", type:"textarea", label:"Chronic conditions / diagnoses" },
    { id:"mh.surgeries", type:"textarea", label:"Surgeries / procedures" },
    { id:"mh.hospitalizations", type:"textarea", label:"Hospitalizations (last 5 years)" }
  ]};
}
''')

write(root / "modules/questionnaires/modules/base/medsAllergies.ts", '''
import type { ModuleConfig } from "@/modules/questionnaires/types";
export function baseMedsAllergiesModule(): ModuleConfig {
  return { key:"base_meds_allergies", title:"Medications & allergies", description:"Current meds and known allergies.", questions:[
    { id:"meds.current", type:"textarea", label:"Current medications (name, dose, frequency)" },
    { id:"meds.supplements", type:"textarea", label:"Supplements" },
    { id:"allergies.drugs", type:"textarea", label:"Drug allergies / reactions" },
    { id:"allergies.other", type:"textarea", label:"Food / latex / other allergies" }
  ]};
}
''')

write(root / "modules/questionnaires/modules/base/familyHistory.ts", '''
import type { ModuleConfig } from "@/modules/questionnaires/types";
export function baseFamilyHistoryModule(): ModuleConfig {
  return { key:"base_family_history", title:"Family history", description:"Relatives' conditions.", questions:[
    { id:"fh.cardiometabolic", type:"textarea", label:"Cardiometabolic (CAD, HTN, stroke, diabetes)" },
    { id:"fh.cancer", type:"textarea", label:"Cancer (type, relative, age at dx)" },
    { id:"fh.other", type:"textarea", label:"Other significant conditions" }
  ]};
}
''')

write(root / "modules/questionnaires/modules/base/immunizations.ts", '''
import type { ModuleConfig } from "@/modules/questionnaires/types";
export function baseImmunizationsModule(): ModuleConfig {
  return { key:"base_immunizations", title:"Immunizations", description:"Recent vaccinations and boosters.", questions:[
    { id:"imm.covid", type:"select", label:"COVID-19 vaccination up to date?", options:[{value:"yes",label:"Yes"},{value:"no",label:"No"},{value:"unsure",label:"Not sure"}] },
    { id:"imm.tdap", type:"select", label:"Tdap (last 10 years)?", options:[{value:"yes",label:"Yes"},{value:"no",label:"No"},{value:"unsure",label:"Not sure"}] },
    { id:"imm.flu", type:"select", label:"Influenza (this season)?", options:[{value:"yes",label:"Yes"},{value:"no",label:"No"}] },
    { id:"imm.notes", type:"textarea", label:"Notes" }
  ]};
}
''')

write(root / "modules/questionnaires/modules/base/vitalsLifestyle.ts", '''
import type { ModuleConfig } from "@/modules/questionnaires/types";
export function baseVitalsLifestyleModule(): ModuleConfig {
  return { key:"base_vitals_lifestyle", title:"Vitals & lifestyle", description:"Basic vitals and daily habits.", questions:[
    { id:"vl.height_cm", type:"text", label:"Height (cm)", placeholder:"e.g. 178" },
    { id:"vl.weight_kg", type:"text", label:"Weight (kg)", placeholder:"e.g. 76" },
    { id:"vl.bp_avg", type:"text", label:"Usual blood pressure (mmHg)", placeholder:"e.g. 120/80" },
    { id:"vl.activity", type:"select", label:"Weekly physical activity", options:[{value:"low",label:"< 75 min/week"},{value:"mod",label:"75–150 min/week"},{value:"high",label:"> 150 min/week"}] },
    { id:"vl.sleep", type:"text", label:"Average sleep (hours/night)", placeholder:"e.g. 7" },
    { id:"vl.diet", type:"textarea", label:"Dietary pattern (brief)" }
  ]};
}
''')

write(root / "modules/questionnaires/modules/base/symptoms.ts", '''
import type { ModuleConfig } from "@/modules/questionnaires/types";
export function baseSymptomsModule(): ModuleConfig {
  return { key:"base_symptoms", title:"Symptoms", description:"Current symptoms and duration.", questions:[
    { id:"sym.current", type:"textarea", label:"Current symptoms" },
    { id:"sym.duration", type:"text", label:"Duration", placeholder:"e.g. 2 months" },
    { id:"sym.severity", type:"select", label:"Severity", options:[{value:"mild",label:"Mild"},{value:"moderate",label:"Moderate"},{value:"severe",label:"Severe"}] }
  ]};
}
''')

write(root / "modules/questionnaires/modules/base/careTeam.ts", '''
import type { ModuleConfig } from "@/modules/questionnaires/types";
export function baseCareTeamModule(): ModuleConfig {
  return { key:"base_care_team", title:"Care team", description:"Your primary care and specialists.", questions:[
    { id:"ct.pcp", type:"text", label:"Primary care physician", placeholder:"Name / Clinic" },
    { id:"ct.specialists", type:"textarea", label:"Specialists", placeholder:"e.g. cardiologist — Dr. Smith; endocrinologist — Dr. Lee" },
    { id:"ct.next_appt", type:"text", label:"Next appointment (YYYY-MM-DD)", placeholder:"e.g. 2025-10-02" }
  ]};
}
''')

print("OK")
