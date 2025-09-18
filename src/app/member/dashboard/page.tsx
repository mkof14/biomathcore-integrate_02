"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/* ----- tiny UI helpers (no external libs) ----- */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 shadow-lg",
        "bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(46,140,240,0.12),transparent),radial-gradient(1200px_600px_at_120%_10%,rgba(16,185,129,0.10),transparent),#0b1424]",
        "backdrop-blur",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function Ring({ value, label }: { value: number; label: string }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const dash = ((100 - clamped) / 100) * circumference;
  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 140 140" className="h-28 w-28">
        <circle cx="70" cy="70" r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="none" />
        <circle
          cx="70" cy="70" r={radius}
          stroke="url(#grad)"
          strokeWidth="12" fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dash}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
        />
        <defs>
          <linearGradient id="grad" x1="0" x2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>
      <div>
        <div className="text-3xl font-extrabold text-white">{value}<span className="text-slate-300 text-xl">%</span></div>
        <div className="text-slate-300/80 text-sm">{label}</div>
      </div>
    </div>
  );
}

function RiskBar({ label, value, tone }: { label: string; value: number; tone?: "green"|"yellow"|"red" }) {
  const color =
    tone === "green" ? "bg-emerald-400" :
    tone === "yellow" ? "bg-amber-400" : "bg-rose-400";
  const w = Math.max(4, Math.min(100, value));
  return (
    <div className="flex items-center gap-3">
      <div className="w-48 text-slate-200/90 text-sm">{label}</div>
      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${w}%` }} />
      </div>
    </div>
  );
}

/* ----- fake demo data (replace with real sources later) ----- */
const demo = {
  bioAgeYears: 45,
  readiness: 78,
  hydration: 62,
  activity: 71,
  sleep: 83,
  risks: [
    { label: "Cardiovascular", value: 62, tone: "yellow" as const },
    { label: "Type 2 Diabetes", value: 28, tone: "green" as const },
    { label: "Alzheimer’s", value: 66, tone: "red" as const },
    { label: "Osteoporosis", value: 35, tone: "green" as const },
  ],
  metrics: [
    { emoji: "❤️", label: "Heart Rate", value: "72 bpm" },
    { emoji: "👣", label: "Steps", value: "8,543" },
    { emoji: "😴", label: "Sleep", value: "7h 30m" },
  ],
  notifications: [
    { type: "alert", title: "High cholesterol risk. Consider diet changes.", when: "Today" },
    { type: "info", title: "Low activity yesterday. Try a 20-min walk.", when: "Today" },
    { type: "warn", title: "Sleep debt: only 5h last night.", when: "Yesterday" },
  ],
  insights: [
    "Your morning energy is higher. Schedule harder workouts before noon.",
    "Add fiber today to improve digestion.",
    "Consider light yoga to reduce stress and improve flexibility.",
  ],
};

export default function DashboardPage() {
  const [checks, setChecks] = useState<Record<string, boolean>>({
    move: false, greens: false, meditate: false, water: false, sleep: false,
  });

  const todayProgress = useMemo(() => {
    const total = Object.keys(checks).length;
    const done = Object.values(checks).filter(Boolean).length;
    return Math.round((done / total) * 100);
  }, [checks]);

  const toggle = (k: string) => setChecks(s => ({ ...s, [k]: !s[k] }));

  return (
    <div className="min-h-[100svh] px-6 py-6 text-slate-100"
      style={{
        background:
          "radial-gradient(1200px 600px at -10% -10%, rgba(56,189,248,0.10), transparent), " +
          "radial-gradient(900px 500px at 120% -20%, rgba(16,185,129,0.08), transparent), #0b1424",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Link
            href="/member"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          >
            ← Back to Member Zone
          </Link>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
          Your Dashboard
        </h1>

        {/* Row 1 */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-slate-200/90 text-lg font-semibold">Biological Age</div>
                <div className="text-sm text-slate-300/80">🎉 5 years younger!</div>
              </div>
            </div>
            <div className="mt-4">
              <Ring value={Math.max(0, Math.min(100, (65 - demo.bioAgeYears) / 65 * 100))} label={`${demo.bioAgeYears} years`} />
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-slate-200/90 text-lg font-semibold mb-4">Disease Risk Profile</div>
            <div className="space-y-3">
              {demo.risks.map(r => (
                <RiskBar key={r.label} label={r.label} value={r.value} tone={r.tone} />
              ))}
            </div>
          </Card>
        </div>

        {/* Row 2 */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Card className="p-6">
            <div className="text-lg font-semibold text-slate-200/90 mb-4">Today’s Actions</div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-slate-300/80">Complete your daily checklist</div>
              <div className="text-sm text-slate-200/90">Progress: {todayProgress}%</div>
            </div>
            <div className="grid gap-3">
              {[
                { key: "move", text: "30 minutes of moderate cardio" },
                { key: "greens", text: "Add leafy greens to two meals" },
                { key: "meditate", text: "Meditate for 10 minutes" },
                { key: "water", text: "Drink 8 glasses of water" },
                { key: "sleep", text: "Review sleep schedule" },
              ].map(i => (
                <button
                  key={i.key}
                  onClick={() => toggle(i.key)}
                  className={[
                    "flex items-center justify-between rounded-xl border px-4 py-3 text-left",
                    checks[i.key] ? "border-emerald-400/40 bg-emerald-400/10" : "border-white/10 bg-white/5 hover:bg-white/10",
                  ].join(" ")}
                >
                  <span className="text-slate-200">{i.text}</span>
                  <span className={checks[i.key] ? "text-emerald-300" : "text-slate-400"}>{checks[i.key] ? "✓" : "○"}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-lg font-semibold text-slate-200/90 mb-4">Real-Time Metrics</div>
            <div className="grid sm:grid-cols-3 gap-4">
              {demo.metrics.map(m => (
                <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl">{m.emoji}</div>
                  <div className="mt-1 text-sm text-slate-300/80">{m.label}</div>
                  <div className="text-xl font-semibold text-white">{m.value}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Row 3 */}
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <div className="text-lg font-semibold text-slate-200/90 mb-4">AI Health Insights</div>
            <div className="space-y-3">
              {demo.insights.map((t, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 text-slate-200/90">{t}</div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-lg font-semibold text-slate-200/90 mb-4">Smart Notifications</div>
            <div className="space-y-3">
              {demo.notifications.map((n, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-slate-200/90 text-sm">{n.title}</div>
                  <div className="text-xs text-slate-400 mt-1">{n.when}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick actions */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Card className="p-6">
            <div className="text-lg font-semibold text-slate-200/90 mb-4">Quick Actions</div>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/member/questionnaires" className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10">
                🧠 <span className="ml-2">AI Assistant</span>
              </Link>
              <Link href="/member/questionnaires" className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10">
                📝 <span className="ml-2">Update intake</span>
              </Link>
              <Link href="/member/billing" className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10">
                💳 <span className="ml-2">Billing</span>
              </Link>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-lg font-semibold text-slate-200/90 mb-4">Sync & Export</div>
            <div className="grid sm:grid-cols-2 gap-4">
              <button className="rounded-xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10">📱 Sync devices</button>
              <button className="rounded-xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10">📄 Export PDF report</button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
