"use client";
import { useRouter } from "next/navigation";

import { useEffect, useMemo, useState } from "react";
import { loadSelected, saveSelected } from "@/lib/catalogSelection";

type Category = {
  id: string;
  slug: string;
  title: string;
  price: number;
  priority: number;
};
export default function CatalogClient({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const CORE = 19;
  const CAP = 79;

  // 1) selection state
  const [selected, setSelected] = useState<string[]>([]);

  // hydrate from localStorage on mount
  useEffect(() => {
    const fromStorage = loadSelected();
    setSelected(fromStorage);
  }, []);

  // persist to localStorage on change
  useEffect(() => {
    saveSelected(selected);
  }, [selected]);

  // safe toggles
  function toggle(slug: string) {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }
  function clear() {
    setSelected([]);
  }

  const addOn = useMemo(() => {
    const bySlug = new Map(categories.map((c) => [c.slug, c.price]));
    return selected.reduce((sum, s) => sum + (bySlug.get(s) ?? 0), 0);
  }, [selected, categories]);

  const total = Math.min(CORE + addOn, CAP);
  const capped = CORE + addOn >= CAP;
  const progress = Math.min(100, Math.round((total / CAP) * 100));

  // brand tones per card (stable, darker, no blinding hover)
  const tones: string[] = [
    "from-[#1f3b73] to-[#1b2957]",
    "from-[#1b5e4a] to-[#163f31]",
    "from-[#6c274b] to-[#2f1623]",
    "from-[#5b3a0f] to-[#2d1f09]",
    "from-[#314a63] to-[#1b2a3a]",
    "from-[#3b3b3b] to-[#232323]",
  ];

  const toneFor = (idx: number) => tones[idx % tones.length];
  function onContinue() {
    try {
      // Try to read selected items from state commonly named "selected" or "selections"
      const picks =
        (typeof selected !== "undefined"
          ? selected
          : typeof selections !== "undefined"
            ? selections
            : []) || [];
      const val = encodeURIComponent(JSON.stringify(picks));
      document.cookie =
        "bmc.selected=" +
        val +
        "; Path=/; Max-Age=" +
        60 * 60 * 24 * 30 +
        "; SameSite=Lax";
    } catch (e) {}
    router.push("/member/questionnaires");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b142a] via-[#0d1833] to-[#0b142a] text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            Service Catalog
          </h1>
          <div className="text-xs opacity-75">{selected.length} selected</div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* cards */}
          <section className="lg:col-span-8">
            {categories.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-sm">
                Catalog is empty. Seed data is required.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((c, i) => {
                  const active = selected.includes(c.slug);
                  const tone = toneFor(i);
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggle(c.slug)}
                      className={[
                        "group relative overflow-hidden rounded-2xl p-4 text-left shadow-lg border transition-all",
                        "border-white/10",
                        active
                          ? "ring-2 ring-emerald-400/70"
                          : "hover:ring-1 hover:ring-white/20",
                        "bg-gradient-to-br " + tone,
                      ].join(" ")}
                    >
                      <div className="relative z-10">
                        <div className="flex items-start justify-between">
                          <div className="pr-2">
                            <div className="text-base font-medium">
                              {c.title}
                            </div>
                            <div className="mt-1 text-[11px] text-white/70">
                              Priority #{c.priority}
                            </div>
                          </div>
                          <div className="text-sm text-white/85">
                            ${c.price}
                          </div>
                        </div>

                        <div className="mt-3">
                          <span
                            className={[
                              "bmc-add-chip inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px]",
                              active
                                ? "bg-emerald-400/15 text-emerald-200 border border-emerald-400/40"
                                : "bg-white/10 text-white/85 border border-white/10",
                            ].join(" ")}
                          >
                            <span
                              className={
                                "dot inline-block h-2 w-2 rounded-full " +
                                (active ? "bg-emerald-300" : "bg-white/70")
                              }
                            />
                            {active ? "Added" : "Add"}
                          </span>
                        </div>
                      </div>

                      {/* NO bright overlay on hover — only subtle border via hover:ring above */}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {/* calculator */}
          <aside className="lg:col-span-4">
            <div className="sticky top-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm opacity-80">Your plan</div>
                <div className="text-xs opacity-70">
                  {selected.length} selected
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-xs opacity-80">
                  <span>$19</span>
                  <span>$79</span>
                </div>
                <div className="bmc-progress w-full h-4 rounded-full bg-white/10 overflow-hidden border border-white/15">
                  <div
                    className={[
                      "bar h-4 rounded-full transition-all duration-300",
                      capped
                        ? "bg-gradient-to-r from-rose-400 to-amber-400"
                        : "bg-gradient-to-r from-sky-400 to-emerald-400",
                    ].join(" ")}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between text-sm">
                  <div>
                    Total: <span className="font-semibold">${total}</span>
                    {capped && (
                      <span className="ml-2 text-amber-300 font-medium">
                        MAX ($79)
                      </span>
                    )}
                  </div>
                  {!capped && (
                    <div className="text-xs text-slate-300/80">
                      To MAX left: ${CAP - total}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Core plan</span>
                  <span>${CORE}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Add-ons</span>
                  <span>${addOn}</span>
                </div>
                <div className="pt-3 mt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-3xl font-extrabold tracking-tight">
                      ${total}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={clear}
                  className="w-1/3 rounded-xl px-3 py-2 text-sm font-medium bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-colors"
                >
                  Clear
                </button>
                <a
                  href="/member/questionnaires/dynamic"
                  className="w-2/3 inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold bg-gradient-to-r from-sky-400 to-emerald-400 text-slate-900"
                >
                  Continue
                </a>
              </div>

              <p className="mt-3 text-[11px] text-slate-300/80">
                Total is capped at $79. Add-ons cost $4–$7 each.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
