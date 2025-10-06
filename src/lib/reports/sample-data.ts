import type { GeneratedReport, ReportPlan } from "@/types/report";

function baseSections(): GeneratedReport["sections"] {
  return [
    {
      id: "overview",
      title: "Overview",
      description: "High-level snapshot with simple language.",
      items: [
        { label: "Biological age (est.)", value: 38 },
        {
          label: "Stress level (self-report)",
          value: "moderate",
          hint: "Daily questionnaire average",
        },
        { label: "Activity trend (7-day)", value: "up" },
      ],
      notes: [
        "We use plain explanations. Example: if you take blood thinners (anticoagulants), avoid ibuprofen — it increases bleeding risk.",
      ],
    },
    {
      id: "risks",
      title: "Risk Insights",
      description: "Key flagged risks with practical actions.",
      items: [
        { label: "Cardio risk (10y, est.)", value: "low-moderate" },
        { label: "Sleep debt (7d)", value: "1.3h" },
      ],
      notes: [
        "Simple actions beat complex plans. Add 20–30 min earlier bedtime, hydrate, short evening walk.",
      ],
    },
  ];
}

function planSpecific(plan: ReportPlan): GeneratedReport["sections"] {
  if (plan === "core") {
    return [
      {
        id: "labs",
        title: "Labs Snapshot",
        items: [
          { label: "HbA1c", value: "5.3%" },
          { label: "LDL-C", value: "112 mg/dL" },
          {
            label: "Vitamin D",
            value: "28 ng/mL",
            hint: "Slightly low → consider supplement after clinician advice",
          },
        ],
      },
    ];
  }
  if (plan === "daily") {
    return [
      {
        id: "today",
        title: "Today Focus",
        items: [
          { label: "Steps", value: 7240 },
          { label: "HRV (ms)", value: 48 },
          { label: "Sleep last night", value: "6h 42m" },
        ],
      },
    ];
  }
  return [
    {
      id: "deep",
      title: "Deep Analytics",
      description: "Extra sections and charts.",
      charts: [
        {
          id: "hrv_trend",
          kind: "line",
          data: [
            { d: "Mon", v: 42 },
            { d: "Tue", v: 45 },
            { d: "Wed", v: 47 },
            { d: "Thu", v: 50 },
          ],
        },
      ],
    },
  ];
}

export function buildSampleReport(
  plan: ReportPlan,
  userId?: string,
): GeneratedReport {
  return {
    plan,
    generatedAt: new Date().toISOString(),
    userId,
    title:
      plan === "daily"
        ? "Daily Brief"
        : plan === "core"
          ? "Core Health Report"
          : "Max (Extended) Report",
    summary:
      "Straightforward, human-readable summary with plain recommendations.",
    sections: [...baseSections(), ...planSpecific(plan)],
    meta: { version: 1 },
  };
}
