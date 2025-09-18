"use client";
import Engine from "@/modules/questionnaires/engine/QuestionnaireEngine";
import { modulesForPlan } from "@/modules/questionnaires/registry";
import type { Plan } from "@/modules/questionnaires/types";
import { useCallback, useMemo } from "react";

export default function EnginePageClient({ plan }: { plan: Plan }) {
  const modules = useMemo(() => modulesForPlan(plan), [plan]);

  const onSubmit = useCallback(async (payload: { answers: Record<string, string|number>, metricMode: any }) => {
    await fetch("/api/questionnaires/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, ...payload }),
    });
    // Navigate or toast as needed (no style changes)
    window.location.href = "/member"; // or /member/dashboard
  }, [plan]);

  return <Engine modules={modules} initialMetric="percent" storageKey={`bmc.qna.${plan}`} onSubmit={onSubmit} />;
}
