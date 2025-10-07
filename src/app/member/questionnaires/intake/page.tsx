"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Field =
  | {
      name: string;
      label: string;
      type: "text" | "textarea";
      required?: boolean;
    }
  | {
      name: string;
      label: string;
      type: "number";
      required?: boolean;
      min?: number;
      max?: number;
    }
  | {
      name: string;
      label: string;
      type: "select";
      required?: boolean;
      options: string[];
    }
  | { name: string; label: string; type: "checkbox"; required?: boolean };

const STORAGE_KEY = "bmc.catalog.selected";

export default function IntakePage() {
  const [fields, setFields] = useState<Field[]>([]);
  const [values, setValues] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  // load selected categories from localStorage
  function loadSelected() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const arr = JSON.parse(raw || "[]");
      return Array.isArray(arr) ? (arr as string[]) : [];
    } catch {
      return [];
    }
  }

  const refresh = async () => {
    const cats = loadSelected();
    setSelected(cats);
    const res = await fetch("/api/questionnaires/dynamic-intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categories: cats }),
    });
    const data = await res.json();
    setFields(data.fields || []);
  };

  useEffect(() => {
    refresh();
    const onChange = () => refresh();
    window.addEventListener("bmc-catalog-changed", onChange);
    return () => window.removeEventListener("bmc-catalog-changed", onChange);
  }, []);

  function setVal(name: string, val: any) {
    setValues((p) => ({ ...p, [name]: val }));
  }

  const requiredMissing = useMemo(() => {
    return fields
      .filter((f: any) => f.required)
      .some((f: any) => {
        const v = (values as any)[f.name];
        return v === undefined || v === "" || v === false || v === null;
      });
  }, [fields, values]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (requiredMissing) {
      setError("Please fill all required fields.");
      return;
    }
    const payload = { categories: selected, answers: values };
    await fetch("/api/questionnaires/dynamic-intake/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    alert("Submitted");
  }

  const inputBase =
    "w-full rounded-xl border px-3 py-2 text-sm bg-[#0f1e3a]/70 border-white/10 text-slate-100 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400";
  const selectBase =
    "w-full rounded-xl border px-3 py-2 text-sm bg-[#0f1e3a]/70 border-white/10 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400";
  const textareaBase =
    "w-full rounded-xl border px-3 py-2 text-sm h-32 resize-vertical bg-[#0f1e3a]/70 border-white/10 text-slate-100 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400";

  return (
    <div className="min-h-screen bg-[#0b142a] text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Dynamic Intake
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <section className="lg:col-span-8">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Selected categories</div>
                  <div className="btn-nasa">
                    {selected.length
                      ? selected.join(", ")
                      : "No categories selected yet."}
                  </div>
                </div>
                <button
                  onClick={refresh}
                  className="text-sky-300 text-sm underline underline-offset-4"
                >
                  Refresh
                </button>
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                {fields.map((f, idx) => {
                  const name = (f as any).name;
                  const label = (f as any).label;
                  const req = (f as any).required;

                  if (f.type === "text")
                    return (
                      <label key={idx} className="block text-sm">
                        <span className="mb-1 inline-block">
                          {label}
                          {req && " *"}
                        </span>
                        <input
                          className={inputBase}
                          value={values[name] ?? ""}
                          onChange={(e) => setVal(name, e.target.value)}
                        />
                      </label>
                    );

                  if (f.type === "number")
                    return (
                      <label key={idx} className="block text-sm">
                        <span className="mb-1 inline-block">
                          {label}
                          {req && " *"}
                        </span>
                        <input
                          type="number"
                          className={inputBase}
                          value={values[name] ?? ""}
                          onChange={(e) => setVal(name, e.target.value)}
                          min={(f as any).min}
                          max={(f as any).max}
                        />
                      </label>
                    );

                  if (f.type === "textarea")
                    return (
                      <label key={idx} className="block text-sm">
                        <span className="mb-1 inline-block">
                          {label}
                          {req && " *"}
                        </span>
                        <textarea
                          className={textareaBase}
                          value={values[name] ?? ""}
                          onChange={(e) => setVal(name, e.target.value)}
                        />
                      </label>
                    );

                  if (f.type === "select")
                    return (
                      <label key={idx} className="block text-sm">
                        <span className="mb-1 inline-block">
                          {label}
                          {req && " *"}
                        </span>
                        <select
                          className={selectBase}
                          value={values[name] ?? ""}
                          onChange={(e) => setVal(name, e.target.value)}
                        >
                          <option value="" disabled>
                            Select…
                          </option>
                          {(f as any).options?.map((opt: string) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </label>
                    );

                  if (f.type === "checkbox")
                    return (
                      <label
                        key={idx}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={!!values[name]}
                          onChange={(e) => setVal(name, e.target.checked)}
                          className="h-4 w-4 rounded border-white/10 bg-slate-950 outline-none focus:ring-2 focus:ring-sky-400"
                        />
                        {label}
                        {req && " *"}
                      </label>
                    );

                  return null;
                })}

                {error && <div className="text-rose-300 text-sm">{error}</div>}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-400 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </section>

          <aside className="lg:col-span-4">
            <div className="sticky top-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-lg">
              <div className="text-sm font-medium">Expanding questionnaire</div>
              <div className="mt-2 text-xs opacity-80">
                Fields are added dynamically from your selected categories in
                the Service Catalog.
              </div>
              <div className="mt-4">
                <Link
                  href="/member/catalog"
                  className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm"
                >
                  Edit categories
                </Link>
              </div>
              <div className="mt-3 text-xs opacity-70">
                Tip: try Sleep &amp; Recovery, Fitness &amp; Performance or
                Mental Wellness to see extra fields.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
