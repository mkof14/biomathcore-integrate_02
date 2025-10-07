"use client";
import React from "react";

type Item = {
  id: string;
  userId: string;
  model?: string | null;
  duration?: number | null;
  tokensIn?: number | null;
  tokensOut?: number | null;
  status: "ok" | "fallback" | "rate-limit" | "error" | string;
  fallback?: boolean;
  createdAt: string;
};

function Dot({ status }: { status: string }) {
  const cl =
    status === "ok"
      ? "bg-emerald-500"
      : status === "fallback"
        ? "bg-amber-400"
        : status === "rate-limit"
          ? "bg-orange-500"
          : "bg-rose-500";
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${cl}`} />;
}

export default function AssistantTimeline({
  userId = "U1001",
}: {
  userId?: string;
}) {
  const [items, setItems] = React.useState<Item[] | null>(null);
  const [err, setErr] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<string>("all");

  const abortRef = React.useRef<AbortController | null>(null);
  const timerRef = React.useRef<any>(null);

  const loadOnce = React.useCallback(
    async (signal?: AbortSignal) => {
      const url = `/api/assistant/activity?userId=${encodeURIComponent(userId)}`;
      const res = await fetch(url, { cache: "no-store", signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      let arr: Item[] = Array.isArray(data?.items) ? data.items : [];
      if (status !== "all") arr = arr.filter((i) => i.status === status);
      setItems(arr);
      setErr(null);
    },
    [userId, status],
  );

  React.useEffect(() => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    const start = () => {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        loadOnce(abortRef.current?.signal).catch((e) => {
          if (e?.name !== "AbortError") setErr(e?.message || "Failed to load");
        });
      }, 5000);
    };
    loadOnce(abortRef.current.signal).catch((e) =>
      setErr(e?.message || "Failed to load"),
    );
    start();

    const onVis = () => {
      if (document.visibilityState === "visible") {
        abortRef.current?.abort();
        abortRef.current = new AbortController();
        loadOnce(abortRef.current.signal).catch(() => {});
        start();
      } else {
        clearInterval(timerRef.current);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      clearInterval(timerRef.current);
      abortRef.current?.abort();
    };
  }, [loadOnce]);

  return (
    <div className="rounded-2xl border border-slate-800/60 bg-slate-800/40 backdrop-blur-sm">
      <div className="px-4 py-3 border-b border-slate-800/60 text-sm font-semibold text-slate-200 flex items-center justify-between gap-3">
        <span>Assistant Activity</span>
        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-slate-900/60 border border-slate-700 text-slate-200 text-xs rounded-md px-2 py-1"
            title="Filter by status"
          >
            <option value="all">all</option>
            <option value="ok">ok</option>
            <option value="fallback">fallback</option>
            <option value="rate-limit">rate-limit</option>
            <option value="error">error</option>
          </select>
          <a
            href="/member/health-assistant"
            className="text-xs px-2 py-1 rounded-md bg-sky-600/80 hover:bg-sky-600 text-white"
          >
            Ask Assistant
          </a>
          <a
            href="/member/health-blackbox"
            className="text-xs px-2 py-1 rounded-md bg-emerald-600/80 hover:bg-emerald-600 text-white"
          >
            Upload File
          </a>
          <a
            href="/member/questionnaires"
            className="text-xs px-2 py-1 rounded-md bg-amber-600/80 hover:bg-amber-600 text-white"
          >
            Questionnaires
          </a>
        </div>
      </div>

      {err && <div className="px-4 py-3 text-sm text-rose-300">{err}</div>}
      {!items && !err && (
        <div className="px-4 py-3 text-sm text-slate-400">Loading…</div>
      )}
      {items && items.length === 0 && (
        <div className="px-4 py-3 text-sm text-slate-400">
          No assistant activity yet.
        </div>
      )}

      {items && items.length > 0 && (
        <ul className="px-4 py-2">
          {items.map((it) => (
            <li
              key={it.id}
              className="relative pl-6 py-3 border-l border-slate-800/60 last:border-b-0"
            >
              <span className="absolute -left-1 top-4">
                <Dot status={it.status} />
              </span>
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-200">
                  <span className="font-medium capitalize">{it.status}</span>
                  {/* модель намеренно не показываем */}
                </div>
                <div className="text-xs text-slate-400">
                  {new Date(it.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {typeof it.duration === "number"
                  ? `duration: ${it.duration} ms`
                  : ""}
                {typeof it.tokensIn === "number" ||
                typeof it.tokensOut === "number" ? (
                  <span>
                    {" "}
                    · tokens: {it.tokensIn ?? "-"} / {it.tokensOut ?? "-"}
                  </span>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
