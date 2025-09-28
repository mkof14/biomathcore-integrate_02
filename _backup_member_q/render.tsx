"use client";
import UnitsToolbar from "./UnitsToolbar";

import React, { useEffect, useMemo, useState } from "react";
import type { Plan } from "@/modules/questionnaires/types";
import Engine from "@/modules/questionnaires/engine/QuestionnaireEngine";
import { modulesForPlan } from "@/modules/questionnaires/registry";

function transformModulesForUnits(
  mods: any[],
  metric: "percent" | "score" | "level",
) {
  // Примем условность:
  // percent  -> Metric (см, кг, мм рт.ст.)
  // score    -> Imperial (ft/in, lb)
  // level    -> Metric+подсказки
  const sys = metric === "score" ? "imperial" : "metric";

  return mods.map((m: any) => {
    const mm = { ...m };
    if (!Array.isArray(mm.questions)) return mm;
    mm.questions = mm.questions.map((q: any) => {
      if (q?.id === "vl.height_cm" && q?.type === "text") {
        const qq = { ...q };
        if (sys === "imperial") {
          qq.label = "Height (ft/in)";
          qq.placeholder = "e.g. 5'11\"";
        } else {
          qq.label = "Height (cm)";
          qq.placeholder = "e.g. 180";
        }
        return qq;
      }
      if (q?.id === "vl.weight_kg" && q?.type === "text") {
        const qq = { ...q };
        if (sys === "imperial") {
          qq.label = "Weight (lb)";
          qq.placeholder = "e.g. 172";
        } else {
          qq.label = "Weight (kg)";
          qq.placeholder = "e.g. 78";
        }
        return qq;
      }
      if (q?.id === "vl.bp" && q?.type === "text") {
        const qq = { ...q };
        if (sys === "imperial") {
          // оставляем mmHg, но даём понятный placeholder
          qq.label = "Recent BP (mmHg)";
          qq.placeholder = "e.g. 120/80";
        } else {
          qq.label = "Recent BP (mmHg)";
          qq.placeholder = "e.g. 120/80";
        }
        return qq;
      }
      return q;
    });
    return mm;
  });
}

export default function EnginePageClient({ plan }: { plan: Plan }) {
  const [started, setStarted] = useState(false);
  const [units, setUnits] = useState("metric");
  const modules = useMemo(
    () => transformModulesForUnits(modulesForPlan(plan), units),
    [plan, units],
  );

  // progress state available for both branches; bar is only rendered after Start
  const [progress, setProgress] = useState(0);
  const storageKey = `bmc.qna.${plan}`;
  const totalQuestions = useMemo(
    () =>
      modules.reduce(
        (n: number, m: any) =>
          n + (Array.isArray(m?.questions) ? m.questions.length : 0),
        0,
      ),
    [modules],
  );
  useEffect(() => {
    let t: any = setInterval(() => {
      try {
        const raw = localStorage.getItem(storageKey);
        const a = raw ? JSON.parse(raw) : {};
        const filled =
          a && typeof a === "object"
            ? Object.values(a).filter((v: any) => v !== "" && v != null).length
            : 0;
        const p = totalQuestions > 0 ? Math.min(1, filled / totalQuestions) : 0;
        setProgress(p);
      } catch {
        setProgress(0);
      }
    }, 800);
    return () => clearInterval(t);
  }, [storageKey, totalQuestions]);

  useEffect(() => {
    console.debug(
      "[QNR] plan=",
      plan,
      "modules=",
      modules.map((m) => m.key),
    );
  }, [plan, modules]);

  async function onSubmit(payload: {
    answers: Record<string, string | number>;
    metricMode: any;
    elapsedSec?: number;
    changes?: number;
  }) {
    await fetch("/api/questionnaires/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, ...payload }),
    }).catch(() => {});
    window.location.href = "/member";
  }

  function HeaderOfficial() {
    return (
      <div className="mb-6">
        <h1
          className="text-2xl"
          style={{ fontWeight: 700, letterSpacing: ".2px" }}
        >
          Member Zone — Questionnaires
        </h1>
        <div
          className="mt-2"
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <img
            src="/images/biomath=core-black1.png"
            alt="BioMath Core"
            style={{ height: 36, width: "auto", opacity: 0.9 }}
          />
          <span className="text-sm opacity-85">
            Please complete the following sections carefully.
          </span>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="w-full">
        <HeaderOfficial />
        <div className="mb-2">BioMath Core — Master Questionnaire</div>
        <button type="button" onClick={() => setStarted(true)}>
          Start
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <HeaderOfficial />
      <div className="mb-4">
        {/* metric-toggle */}
        <div
          className="metric-toolbar"
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            padding: "8px 12px",
            border: "1px solid rgba(255,255,255,.20)",
            borderRadius: 10,
            background: "rgba(255,255,255,.10)",
          }}
        >
          <strong>Metric:</strong>
          <label>
            <input
              type="radio"
              name="m"
              checked={metric === "percent"}
              onChange={() => setMetric("percent")}
            />{" "}
            %
          </label>
          <label>
            <input
              type="radio"
              name="m"
              checked={metric === "score"}
              onChange={() => setMetric("score")}
            />{" "}
            Score
          </label>
          <label>
            <input
              type="radio"
              name="m"
              checked={metric === "level"}
              onChange={() => setMetric("level")}
            />{" "}
            Level
          </label>
        </div>
      </div>
      <div>
        {/* mounted-progress */}
        <div
          style={{
            height: 10,
            borderRadius: 6,
            background: "rgba(0,0,0,.12)",
            overflow: "hidden",
            margin: "4px 0 16px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.round(progress * 100)}%`,
              background:
                "linear-gradient(90deg, rgba(0,0,0,.25), rgba(0,0,0,.15))",
            }}
          />
        </div>
        <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 8 }}></div>
      </div>
      <div className="mb-4">
        {/* metric-toggle */}
        <div
          className="metric-toolbar"
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            padding: "8px 12px",
            border: "1px solid rgba(0,0,0,.12)",
            borderRadius: 10,
            background: "rgba(255,255,255,.65)",
          }}
        >
          <strong>Units:</strong>
          <label
            style={{ display: "inline-flex", gap: 6, alignItems: "center" }}
          >
            <input
              type="radio"
              name="m"
              checked={metric === "percent"}
              onChange={() => setMetric("percent")}
            />
            <span>
              Metric <span style={{ opacity: 0.7 }}>(cm, kg)</span>
            </span>
          </label>
          <label
            style={{ display: "inline-flex", gap: 6, alignItems: "center" }}
          >
            <input
              type="radio"
              name="m"
              checked={metric === "score"}
              onChange={() => setMetric("score")}
            />
            <span>
              Imperial <span style={{ opacity: 0.7 }}>(ft/in, lb)</span>
            </span>
          </label>
        </div>
      </div>
      <div className="mb-2">
        {/* progress bar */}
        <div
          style={{
            height: 10,
            borderRadius: 6,
            background: "rgba(0,0,0,.08)",
            overflow: "hidden",
            margin: "8px 0 12px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.round(progress * 100)}%`,
              background:
                "linear-gradient(90deg, rgba(0,0,0,.25), rgba(0,0,0,.15))",
            }}
          />
        </div>
        <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 8 }}></div>
      </div>
      <UnitsToolbar units={units} setUnits={setUnits} />
      <div className="mb-2">
        {/* units switch */}
        <UnitsToolbar units={units} setUnits={setUnits} />
      </div>
      <div>
        {/* live progress bar */}
        <div
          style={{
            height: 10,
            borderRadius: 6,
            background: "rgba(0,0,0,.08)",
            overflow: "hidden",
            margin: "8px 0 12px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.round(progress * 100)}%`,
              background:
                "linear-gradient(90deg, rgba(0,0,0,.25), rgba(0,0,0,.15))",
            }}
          />
        </div>
        <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 8 }}>
          {Math.round(progress * 100)}% complete
        </div>
      </div>
      <Engine
        key={metric}
        modules={modules}
        initialMetric={metric}
        storageKey={`bmc.qna.${plan}`}
        onSubmit={onSubmit}
      />
    </div>
  );
}
