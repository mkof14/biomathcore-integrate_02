"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

type Cat = {
  id: string;
  title: string;
  price: number;
  group: string;
  core?: boolean;
  color: string;
};

const CATEGORIES: Cat[] = [
  {
    id: "critical-health",
    title: "Critical Health",
    price: 7,
    group: "Core",
    core: true,
    color: "bg-rose-100/50",
  },
  {
    id: "everyday-wellness",
    title: "Everyday Wellness",
    price: 6,
    group: "Core",
    core: true,
    color: "bg-sky-100/50",
  },
  {
    id: "longevity-antiaging",
    title: "Longevity & Anti-Aging",
    price: 6,
    group: "Core",
    core: true,
    color: "bg-emerald-100/50",
  },

  {
    id: "mental-wellness",
    title: "Mental Wellness",
    price: 6,
    group: "Mind & Recovery",
    color: "bg-purple-100/50",
  },
  {
    id: "fitness-performance",
    title: "Fitness & Performance",
    price: 6,
    group: "Performance",
    color: "bg-indigo-100/50",
  },

  {
    id: "womens-health",
    title: "Women’s Health",
    price: 7,
    group: "Sex & Hormones",
    color: "bg-pink-100/50",
  },
  {
    id: "mens-health",
    title: "Men’s Health",
    price: 7,
    group: "Sex & Hormones",
    color: "bg-blue-100/50",
  },

  {
    id: "beauty-skincare",
    title: "Beauty & Skincare",
    price: 5,
    group: "Lifestyle",
    color: "bg-fuchsia-100/50",
  },
  {
    id: "nutrition-diet",
    title: "Nutrition & Diet",
    price: 5,
    group: "Lifestyle",
    color: "bg-lime-100/50",
  },
  {
    id: "sleep-recovery",
    title: "Sleep & Recovery",
    price: 5,
    group: "Mind & Recovery",
    color: "bg-cyan-100/50",
  },
  {
    id: "environmental-health",
    title: "Environmental Health",
    price: 4,
    group: "Lifestyle",
    color: "bg-green-100/50",
  },
  {
    id: "family-health",
    title: "Family Health",
    price: 5,
    group: "Lifestyle",
    color: "bg-orange-100/50",
  },
  {
    id: "preventive-medicine",
    title: "Preventive Medicine & Longevity",
    price: 6,
    group: "Longevity",
    color: "bg-amber-100/50",
  },
  {
    id: "biohacking-performance",
    title: "Biohacking & Performance",
    price: 6,
    group: "Performance",
    color: "bg-teal-100/50",
  },
  {
    id: "senior-care",
    title: "Senior Care",
    price: 5,
    group: "Lifestyle",
    color: "bg-yellow-100/50",
  },
  {
    id: "eye-health-suite",
    title: "Eye-Health Suite",
    price: 4,
    group: "Lifestyle",
    color: "bg-violet-100/50",
  },

  {
    id: "digital-therapeutics-store",
    title: "Digital Therapeutics Store",
    price: 7,
    group: "Add-ons",
    color: "bg-slate-100/50",
  },
  {
    id: "general-sexual-longevity",
    title: "General Sexual Longevity",
    price: 6,
    group: "Sex & Hormones",
    color: "bg-red-100/50",
  },
  {
    id: "mens-sexual-health",
    title: "Men's Sexual Health",
    price: 6,
    group: "Sex & Hormones",
    color: "bg-indigo-100/50",
  },
  {
    id: "womens-sexual-health",
    title: "Women's Sexual Health",
    price: 6,
    group: "Sex & Hormones",
    color: "bg-pink-100/50",
  },
];

const CORE_PRICE = 19;
const MAX_THRESHOLD = 79;

export default function Catalog() {
  const coreIds = useMemo(
    () => CATEGORIES.filter((c) => c.core).map((c) => c.id),
    [],
  );
  const [selected, setSelected] = useState<string[]>([]);
  const extras = useMemo(
    () => CATEGORIES.filter((c) => !c.core && selected.includes(c.id)),
    [selected],
  );
  const extrasTotal = extras.reduce((sum, c) => sum + c.price, 0);
  const subtotal = CORE_PRICE + extrasTotal;
  const pct = Math.min(100, Math.round((subtotal / MAX_THRESHOLD) * 100));
  const maxReached = subtotal >= MAX_THRESHOLD;

  const toggle = (id: string) => {
    if (coreIds.includes(id)) return;
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };
  const clearAll = () => setSelected([]);
  const proceed = async () => {
    await fetch("/api/catalog/selection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        core: coreIds,
        extras: selected,
        total: subtotal,
      }),
    });
    if (maxReached) location.href = "/member/billing";
    else location.href = "/member/questionnaires";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide text-slate-900">
          Catalog
        </h1>
      </div>
      <p className="text-slate-700">
        Browse available categories, build your plan visually, and see pricing
        update in real-time.
      </p>

      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <div className="text-sm text-slate-300">Current total</div>
            <div className="text-4xl font-extrabold tracking-tight">
              ${subtotal}
            </div>
            <div className="mt-3">
              <div className="h-2 rounded bg-slate-700 overflow-hidden">
                <div
                  className={`h-2 ${maxReached ? "bg-red-500" : "bg-sky-400"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-2 text-xs flex justify-between text-slate-400">
                <span>Core ${CORE_PRICE}</span>
                <span>MAX ${MAX_THRESHOLD}</span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[360px]">
            <div className="rounded-xl bg-slate-900/60 border border-slate-700 p-4 backdrop-blur-sm">
              <div className="font-semibold">Plan Summary</div>
              <div className="mt-1 text-sm text-slate-300">
                Core (includes 3 categories)
              </div>
              <div className="text-slate-100 font-semibold">${CORE_PRICE}</div>
              <div className="mt-3 text-sm text-slate-300">Add-ons</div>
              {extras.length === 0 ? (
                <div className="text-sm text-slate-400">
                  No add-ons selected.
                </div>
              ) : (
                <ul className="text-sm space-y-1">
                  {extras.map((x) => (
                    <li key={x.id} className="flex justify-between">
                      <span className="text-slate-200">{x.title}</span>
                      <span className="text-slate-100 font-semibold">
                        ${x.price}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={clearAll}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm"
                >
                  Clear
                </button>
                <button
                  onClick={proceed}
                  className="ml-auto px-4 py-2 rounded-lg bg-gradient-to-r from-sky-400 to-emerald-400 text-black font-semibold"
                >
                  Continue →
                </button>
              </div>
            </div>
          </div>
        </div>
        {maxReached && (
          <div className="mt-4 rounded-lg border border-red-500 bg-red-600 text-white px-4 py-3 text-sm font-semibold">
            You’ve reached the MAX ($79) threshold. MAX includes everything —
            it’s better value now.
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => {
          const isCore = !!cat.core;
          const isSelected = selected.includes(cat.id);
          return (
            <div
              key={cat.id}
              className={[
                "rounded-2xl border p-4 transition-all shadow-sm hover:shadow-md backdrop-blur-sm",
                cat.color,
                isSelected && !isCore
                  ? "ring-2 ring-sky-400"
                  : "border-slate-300/70 hover:border-slate-400/70",
              ].join(" ")}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm uppercase tracking-wider text-slate-700">
                    {cat.group}
                  </div>
                  <div className="text-lg font-semibold mt-1 text-slate-900">
                    {cat.title}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-slate-900 font-bold">
                    ${isCore ? 0 : cat.price}
                  </div>
                  <div className="text-xs text-slate-700">
                    {isCore ? "included in Core" : "per month"}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {isCore ? (
                  <span className="px-3 py-1.5 rounded-lg bg-slate-700 text-slate-200 text-xs">
                    Core
                  </span>
                ) : isSelected ? (
                  <button
                    onClick={() => toggle(cat.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-sm"
                  >
                    Reset
                  </button>
                ) : (
                  <button
                    onClick={() => toggle(cat.id)}
                    className="px-3 py-1.5 rounded-lg bg-sky-200 hover:bg-sky-300 text-slate-900 text-sm border border-sky-300"
                  >
                    Select
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
