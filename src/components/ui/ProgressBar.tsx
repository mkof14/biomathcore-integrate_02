"use client";
export default function ProgressBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  let bg =
    v < 30
      ? "linear-gradient(90deg,#ef4444,#f59e0b)" // красный → оранжевый
      : v < 70
        ? "linear-gradient(90deg,#f59e0b,#10b981)" // оранжевый → зелёный
        : "linear-gradient(90deg,#10b981,#22c55e)"; // зелёный

  return (
    <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${v}%`, background: bg }}
      />
    </div>
  );
}
