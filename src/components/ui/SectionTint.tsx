import type { ReactNode } from "react";

const palette = [
  "bg-gray-50",
  "bg-blue-50",
  "bg-emerald-50",
  "bg-amber-50",
  "bg-purple-50",
  "bg-rose-50",
];

export default function SectionTint({
  index = 0,
  title,
  children,
}: {
  index?: number;
  title: string;
  children: ReactNode;
}) {
  const tint = palette[index % palette.length];
  return (
    <div className={`rounded-lg border border-gray-200 ${tint} p-4`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
