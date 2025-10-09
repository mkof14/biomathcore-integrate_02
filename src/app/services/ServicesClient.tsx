"use client";
import { useSearchParams } from "next/navigation";

export default function ServicesClient() {
  const sp = useSearchParams();
  const q = sp.get("q") ?? "";
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Services</h1>
      {q && <p className="text-sm text-gray-400">Query: {q}</p>}
      {/* ...основной JSX страницы... */}
    </main>
  );
}
