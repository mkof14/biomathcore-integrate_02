"use client";
import { useMemo, useState } from "react";
export default function DataTable<T>({
  rows,
  cols,
}: {
  rows: T[];
  cols: {
    key: keyof T | string;
    label: string;
    render?: (row: T) => React.ReactNode;
  }[];
}) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    if (!q) return rows;
    const needle = q.toLowerCase();
    return rows.filter((r: any) =>
      Object.values(r).some((v) => String(v).toLowerCase().includes(needle)),
    );
  }, [rows, q]);
  return (
    <div className="bg-[#0c1324] border border-slate-800 rounded-xl p-4">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Quick filter…"
        className="mb-3 px-2 py-1 rounded bg-slate-900/60 border border-slate-700"
      />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-slate-400">
            <tr>
              {cols.map((c) => (
                <th key={String(c.key)} className="text-left py-2">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r: any, idx: number) => (
              <tr key={idx} className="border-t border-slate-800">
                {cols.map((c) => (
                  <td key={String(c.key)} className="py-2">
                    {c.render ? c.render(r) : String(r[c.key as keyof T] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
