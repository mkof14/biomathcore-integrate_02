"use client";
import Link from "next/link";
import { hasEntitlement } from "../engine";

export default function SexualHealthIndex() {
  const entitled = hasEntitlement("sexual-health");
  if (!entitled) {
    return (
      <div className="p-6 max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Sexual Health</h1>
        <div className="rounded border p-4 bg-white/80 text-black">
          Access is locked. Please purchase the Sexual Health category to
          continue.
        </div>
        <Link
          href="/member/pricing"
          className="inline-block px-6 py-3 bg-amber-300 text-black font-semibold rounded"
        >
          Go to Plans
        </Link>
      </div>
    );
  }
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Sexual Health</h1>

      <div className="my-6 border-t border-slate-300" />

      <div className="space-y-6">
        <div>
          <Link
            href="/member/questionnaires/sexual-health-general"
            className="inline-block px-6 py-3 bg-rose-400 text-black font-semibold rounded"
          >
            Start 2
          </Link>
          <div className="text-slate-500 mt-2">→ Sexual Health (General)</div>
        </div>

        <div className="my-4 border-t border-slate-200" />

        <div className="space-y-2">
          <Link
            href="/member/questionnaires/sexual-health-male"
            className="inline-block px-6 py-3 bg-rose-400 text-black font-semibold rounded"
          >
            Start 2
          </Link>
          <div className="text-slate-500">→ Sexual Health (Male)</div>
        </div>

        <div className="space-y-2">
          <Link
            href="/member/questionnaires/sexual-health-female"
            className="inline-block px-6 py-3 bg-rose-400 text-black font-semibold rounded"
          >
            Start 2
          </Link>
          <div className="text-slate-500">→ Sexual Health (Female)</div>
        </div>
      </div>

      <div className="my-6 border-t border-slate-300" />
    </div>
  );
}
