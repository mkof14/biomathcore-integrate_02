"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function Toggle({
  checked,
  onChange,
  label,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  id: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-3 cursor-pointer select-none"
    >
      <div
        className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-emerald-500/80" : "bg-slate-700"}`}
      >
        <input
          id={id}
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e: any) => onChange(e.target.checked)}
        />
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </div>
      <span className="text-sm text-slate-200">{label}</span>
    </label>
  );
}

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl p-5 border border-slate-700 bg-slate-900/70 shadow-xl overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-emerald-400/5" />
      <div className="relative">
        <h2 className="font-medium text-slate-100">{title}</h2>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        )}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

type SavedState = {
  encryptionOn: boolean;
  autoBackupOn: boolean;
  autoBackupInterval: string;
  retentionDays: number;
  anomalyAlerts: boolean;
};

const DEFAULTS: SavedState = {
  encryptionOn: true,
  autoBackupOn: true,
  autoBackupInterval: "24h",
  retentionDays: 90,
  anomalyAlerts: true,
};

const STORAGE_KEY = "hbx_settings_v2";

export default function SettingsPage() {
  const [state, setState] = useState<SavedState>(DEFAULTS);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {}
  }, []);

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-900 text-slate-200 p-6">
      {/* Back button */}
      <Link
        href="/member/dashboard"
        className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-400 text-sm mb-6"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </Link>

      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Settings</h1>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Encryption */}
        <Card title="Encryption" subtitle="AES-256 at rest & TLS in transit">
          <div className="flex items-center justify-between">
            <Toggle
              id="encryption"
              label={state.encryptionOn ? "Enabled" : "Disabled"}
              checked={state.encryptionOn}
              onChange={(v) => setState((s) => ({ ...s, encryptionOn: v }))}
            />
            <span
              className={`text-xs px-2 py-1 rounded-lg border ${
                state.encryptionOn
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-700/40"
                  : "bg-amber-500/10 text-amber-300 border-amber-700/40"
              }`}
            >
              {state.encryptionOn ? "AES-256 ON" : "Encryption OFF"}
            </span>
          </div>
        </Card>

        {/* Auto-backup */}
        <Card title="Auto-backup" subtitle="Configure schedule & retention">
          <div className="flex items-center justify-between">
            <Toggle
              id="autobackup"
              label={state.autoBackupOn ? "Enabled" : "Disabled"}
              checked={state.autoBackupOn}
              onChange={(v) => setState((s) => ({ ...s, autoBackupOn: v }))}
            />
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm text-slate-200"
            >
              {expanded ? "Close" : "Configure"}
            </button>
          </div>

          {expanded && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Interval
                </label>
                <select
                  className="w-full rounded-lg bg-slate-800 border border-slate-600 p-2 text-sm text-slate-100 focus:ring-2 focus:ring-cyan-500"
                  value={state.autoBackupInterval}
                  onChange={(e: any) =>
                    setState((s) => ({
                      ...s,
                      autoBackupInterval: e.target.value,
                    }))
                  }
                >
                  <option value="15m">Every 15 minutes</option>
                  <option value="1h">Hourly</option>
                  <option value="6h">Every 6 hours</option>
                  <option value="24h">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Retention
                </label>
                <select
                  className="w-full rounded-lg bg-slate-800 border border-slate-600 p-2 text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500"
                  value={String(state.retentionDays)}
                  onChange={(e: any) =>
                    setState((s) => ({
                      ...s,
                      retentionDays: Number(e.target.value),
                    }))
                  }
                >
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">365 days</option>
                </select>
              </div>

              <Toggle
                id="anomaly"
                label="Email alerts on anomalies"
                checked={state.anomalyAlerts}
                onChange={(v) => setState((s) => ({ ...s, anomalyAlerts: v }))}
              />

              <button
                className="px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-slate-700 hover:from-cyan-500/30 hover:to-emerald-500/30 text-sm text-slate-100"
                onClick={() => alert("Backup started (demo)")}
              >
                Backup now
              </button>
            </div>
          )}
        </Card>
      </div>

      <div className="mt-6">
        <button
          onClick={save}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm text-slate-200"
        >
          Save settings
        </button>
      </div>
    </div>
  );
}
