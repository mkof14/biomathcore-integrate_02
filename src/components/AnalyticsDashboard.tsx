"use client";
import * as React from "react";

type Usage = { service: string; count: number };

export default function AnalyticsDashboard() {
  const [usageData] = React.useState<Usage[]>([
    { service: "Risk Insight", count: 10 },
    { service: "Mindfulness Guide", count: 15 },
    { service: "VO₂-Max Assessment", count: 8 }
  ]);

  return <pre>{JSON.stringify(usageData, null, 2)}</pre>;
}
