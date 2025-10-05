import React from "react";

type UsageItem = { count: number; [k: string]: unknown };

type Props = {
  usageData: UsageItem[];
};

export default function AnalyticsDashboard({ usageData }: Props) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Analytics</h2>
      <ul className="list-disc pl-6">
        {usageData.map((d, i) => (
          <li key={i}>count: {d.count}</li>
        ))}
      </ul>
    </div>
  );
}
