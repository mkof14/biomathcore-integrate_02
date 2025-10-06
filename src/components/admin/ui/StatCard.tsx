"use client";
export default function StatCard({
  title,
  value,
  sub,
}: {
  title: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="bg-[#0c1324] border border-slate-800 rounded-xl p-4">
      <div className="text-slate-400 text-xs">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {sub && <div className="text-slate-500 text-xs">{sub}</div>}
    </div>
  );
}
