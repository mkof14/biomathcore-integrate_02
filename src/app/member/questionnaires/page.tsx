import Link from "next/link";
import { firstSlug } from "./flow";

export default function Page() {
  const first = firstSlug();
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Questionnaires</h1>
      <p className="text-slate-500 mt-3">
        Patient → Lifestyle → Medical History
      </p>

      <div className="mt-8">
        <Link
          href={`/member/questionnaires/${first}`}
          className="inline-block px-6 py-3 bg-gradient-to-r from-sky-400 to-emerald-400 text-black font-semibold rounded"
        >
          Start
        </Link>
      </div>

      <div className="my-8 border-t border-slate-300" />

      <div className="mt-6">
        <Link
          href="/member/questionnaires/sexual-health"
          className="inline-block px-6 py-3 bg-rose-400 text-black font-semibold rounded"
        >
          Start 2
        </Link>
        <div className="text-slate-500 mt-2">→ Sexual Health</div>
      </div>
    </div>
  );
}
