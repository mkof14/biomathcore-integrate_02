"use client";
export default function BackClient() {
  return (
    <button
      onClick={() => history.back()}
      className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
    >
      ← Back
    </button>
  );
}
