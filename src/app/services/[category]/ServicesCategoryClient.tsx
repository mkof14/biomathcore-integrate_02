"use client";
import { useSearchParams } from "next/navigation";

export default function ServicesCategoryClient({ category }: { category: string }) {
  const sp = useSearchParams();
  const q = sp.get("q") ?? "";
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Services: {category}</h1>
      {q && <p className="text-sm text-gray-400">Query: {q}</p>}
    </main>
  );
}
