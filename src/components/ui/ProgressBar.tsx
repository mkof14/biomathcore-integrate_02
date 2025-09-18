"use client";
export default function ProgressBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className="bg-blue-600 h-2.5 rounded-full transition-all" style={{ width: `${v}%` }} />
    </div>
  );
}
