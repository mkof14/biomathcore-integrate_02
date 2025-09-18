"use client";
import { useState } from "react";

type Units = "metric" | "imperial";

export default function UnitsToggle({ defaultUnits = "metric", onChange }: {
  defaultUnits?: Units; onChange?: (u: Units) => void;
}) {
  const [units, setUnits] = useState<Units>(defaultUnits);
  return (
    <div className="inline-flex items-center gap-2 text-sm">
      <span className="text-gray-500">Units:</span>
      <button
        type="button"
        onClick={() => { setUnits("metric"); onChange?.("metric"); }}
        className={`px-3 py-1 rounded border ${units === "metric" ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-100"}`}
      >
        Metric
      </button>
      <button
        type="button"
        onClick={() => { setUnits("imperial"); onChange?.("imperial"); }}
        className={`px-3 py-1 rounded border ${units === "imperial" ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-100"}`}
      >
        Imperial
      </button>
    </div>
  );
}
