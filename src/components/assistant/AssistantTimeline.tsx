"use client";
import { useEffect, useState } from "react";

type Item = {
  id: string;
  model: string | null;
  duration: number | null;
  status: "ok" | "fallback" | "error" | "rate-limit" | string;
  createdAt: string; // ISO
};

function statusDot(status: string) {
  // базовая раскраска по статусу
  const base = "w-2 h-2 rounded-full inline-block mr-2 align-middle";
  switch (status) {
    case "ok": return <span className={`${base} bg-green-500`} />;
    case "fallback": return <span className={`${base} bg-yellow-500`} />;
    case "rate-limit": return <span className={`${base} bg-orange-500`} />;
    case "error": return <span className={`${base} bg-red-500`} />;
    default: return <span className={`${base} bg-gray-400`} />;
  }
}

export default function AssistantTimeline({ userId = "U1001" }: { userId?: string }) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/assistant/activity?userId=${encodeURIComponent(userId)}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setItems(Array.isArray(data?.items) ? data.items : []);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || "Failed to load activity");
      }
    })();
    return () => { cancelled = true; };
  }, [userId]);

  return (
    <div className="rounded-2xl shadow bg-white overflow-hidden">
      <div className="px-4 py-3 border-b">
        <div className="font-semibold">Assistant Activity</div>
      </div>

      {!items && !err && (
        <div className="px-4 py-6 text-sm text-gray-500">Loading…</div>
      )}
      {err && (
        <div className="px-4 py-6 text-sm text-red-600">{err}</div>
      )}
      {items && items.length === 0 && (
        <div className="px-4 py-6 text-sm text-gray-500">No assistant activity yet.</div>
      )}
      {items && items.length > 0 && (
        <ul className="px-4 py-2">
          {items.map((it, idx) => (
            <li key={it.id} className="relative pl-6 py-3 border-l last:border-b-0 border-gray-200">
              <span className="absolute -left-1 top-4">{statusDot(it.status)}</span>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium">{it.status}</span>
                  <span className="text-gray-500"> · {it.model || "—"}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(it.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {typeof it.duration === "number" ? `duration: ${it.duration} ms` : ""}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
