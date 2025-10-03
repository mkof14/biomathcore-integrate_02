"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";

type Category = { id:string; slug:string; title:string; price:number; priority:number };
const CORE = 19, CAP = 79;

const PALETTE = [
  "from-sky-500 to-cyan-400",
  "from-emerald-400 to-teal-300",
  "from-violet-500 to-fuchsia-400",
  "from-rose-400 to-amber-300",
  "from-indigo-500 to-blue-400",
  "from-lime-400 to-emerald-300",
  { href: "/member/health-blackbox", label: "Health Black Box" },
];

export default function BmcCatalogClient({ categories }:{ categories:Category[] }) {
  const router = useRouter();
const [selected, setSelected] = useState<string[]>([]);
  const toggle = (slug:string) => setSelected(p=>p.includes(slug)?p.filter(s=>s!==slug):[...p,slug]);
  const clear = ()=> setSelected([]);

  const addOn = useMemo(()=>selected.reduce((s,slug)=>s+(categories.find(c=>c.slug===slug)?.price??0),0),[selected,categories]);
  const totalRaw = CORE + addOn;
  const total = Math.min(totalRaw, CAP);
  const progress = Math.min(100, Math.round((total/CAP)*100));
  const capped = totalRaw >= CAP;
  function onContinue() {
    try {
      // Try to read selected items from state commonly named "selected" or "selections"
      const picks = (selected ?? []) as string[];
      const val = encodeURIComponent(JSON.stringify(picks));
      document.cookie = "bmc.selected=" + val + "; Path=/; Max-Age=" + (60*60*24*30) + "; SameSite=Lax";
    } catch (e) {}
    router.push("/member/questionnaires");
  }

  return (
    <div className="mx-auto max-w-7xl p-6 text-white">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">BioMath Core — Service Catalog</h1>
          <p className="mt-1 text-sm text-slate-300">
            Core plan <b>${CORE}</b> is always included. Add categories ($4–$7 each) up to ${CAP}.
          </p>
        </div>
        <button type="button" onClick={clear}
          className="rounded-xl px-4 py-2 text-sm font-medium bg-white text-slate-900 border border-white/20 shadow"
        >
          Clear selection
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((c,i)=>{
              const active = selected.includes(c.slug);
              const palette = PALETTE[i % PALETTE.length];
              return (
                <button
                  key={c.id}
                  onClick={()=>toggle(c.slug)}
                  className={[
                    "relative overflow-hidden rounded-2xl p-4 text-left transition-all",
                    "border border-white/10 shadow-sm",
                    "bg-slate-900/40 backdrop-blur-md",
                    active ? "ring-2 ring-cyan-300" : "hover:ring-1 hover:ring-white/20",
                  ].join(" ")}
                >
                  <span
                    aria-hidden
                    className={[
                      "pointer-events-none absolute inset-0 -z-10",
                      "opacity-35 hover:opacity-50 transition-opacity",
                      "bg-gradient-to-br", palette,
                    ].join(" ")}
                  />
                  <span aria-hidden className=" pointer-events-none inset-0 rounded-2xl ring-1 ring-white/10 -z-10" />

                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-white">{c.title}</div>
                      <div className="text-xs mt-1 text-slate-300/80">Priority #{c.priority}</div>
                    </div>
                    <span
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold border backdrop-blur-md"
                      style={{ background:"rgba(255,255,255,.08)", borderColor:"rgba(255,255,255,.2)" }}
                    >
                      ${c.price}
                    </span>
                  </div>

                  <div
                    className={[
                      "mt-3 inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border backdrop-blur-sm",
                      active
                        ? "bg-emerald-400/15 text-emerald-200 border-emerald-300/40"
                        : "bg-white/10 text-white/90 border-white/20",
                    ].join(" ")}
                  >
                    <span className={["w-2 h-2 rounded-full", active ? "bg-emerald-400" : "bg-white/70"].join(" ")} />
                    {active ? "Added" : "Add"}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <aside className="lg:col-span-4">
          <div className="sticky top-6 rounded-2xl p-5 border border-white/10 bg-slate-900/60 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="text-sm">Your plan</div>
              <div className="text-xs text-slate-300/80">{selected.length} selected</div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-slate-300/80 mb-1">
                <span>$19</span><span>$79</span>
              </div>
              <div className="w-full h-4 rounded-full bg-white/10 overflow-hidden border border-white/15">
                <div
                  style={{ width:`${progress}%` }}
                  className={[
                    "h-full rounded-full transition-all duration-300",
                    capped
                      ? "bg-gradient-to-r from-rose-500 to-amber-400"
                      : "bg-gradient-to-r from-sky-400 to-emerald-400",
                  ].join(" ")}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <div>
                  Total: <span className="font-semibold">${total}</span>
                  {capped && <span className="ml-2 text-amber-300 font-medium">MAX ($79)</span>}
                </div>
                {!capped && <div className="text-xs text-slate-300/80">To MAX left: ${CAP-total}</div>}
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between"><span>Core plan</span><span>${CORE}</span></div>
              <div className="flex items-center justify-between"><span>Add-ons</span><span>${addOn}</span></div>
              <div className="pt-3 mt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-3xl font-extrabold tracking-tight">${total}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button type="button" onClick={clear}
                className="w-1/3 rounded-xl px-3 py-2 text-sm font-medium bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-colors"
              >
                Clear
              </button>
              <button onClick={onContinue} type="button" className="w-2/3 rounded-xl px-3 py-2 text-sm font-semibold bg-gradient-to-r from-sky-400 to-emerald-400 text-slate-900">{capped ? "Go MAX ()" : "Continue"}
              </button>
            </div>

            <p className="mt-3 text-[11px] text-slate-300/80">
              Total is capped at $79. Add-ons cost $4–$7 each.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
