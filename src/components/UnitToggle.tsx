"use client";
import { useEffect, useState } from "react";

type UnitSystem = "metric" | "imperial";

export function UnitToggle({
  onChange,
  initial = "metric",
}: {
  onChange?: (u: UnitSystem) => void;
  initial?: UnitSystem;
}) {
  const [u, setU] = useState<UnitSystem>(initial);

  useEffect(() => {
    const saved =
      (localStorage.getItem("unit-system") as UnitSystem) || initial;
    setU(saved);
    onChange?.(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setUnits(next: UnitSystem) {
    setU(next);
    localStorage.setItem("unit-system", next);
    onChange?.(next);
  }

  return (
    <div className="inline-flex rounded border bg-white overflow-hidden text-sm">
      <button
        type="button"
        onClick={() => setUnits("metric")}
        className={`px-3 py-1 ${u === "metric" ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
      >
        Metric
      </button>
      <button
        type="button"
        onClick={() => setUnits("imperial")}
        className={`px-3 py-1 border-l ${u === "imperial" ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
      >
        Imperial
      </button>
    </div>
  );
}
