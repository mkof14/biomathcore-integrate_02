"use client";
import { useRouter } from "next/navigation";

export default function ContinueFab() {
  const router = useRouter();
  const go = (e?: React.MouseEvent) => {
    try { e?.preventDefault?.(); } catch {}
    try { router.push("/member/questionnaires"); } catch {}
  };
  return (
    <button
      type="button"
      onClick={go}
      data-testid="bmc-continue-fab"
      className="fixed bottom-5 right-5 z-[99999] rounded-xl px-4 py-2 text-sm font-semibold
                 bg-gradient-to-r from-sky-400 to-emerald-400 text-slate-900
                 shadow-lg shadow-emerald-500/20 hover:opacity-95 active:opacity-90
                 focus:outline-none focus:ring-2 focus:ring-sky-300 pointer-events-auto"
    >
      Continue
    </button>
  );
}
