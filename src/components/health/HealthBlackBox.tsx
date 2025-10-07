"use client";

import Link from "next/link";
import { useState } from "react";
import UsageCard from "./UsageCard";

type Props = {
  usedBytes?: number;
  files?: number;
  quotaBytes?: number;
  userId?: string;
  lastBackup?: string;
  anomaly?: boolean;
  encrypted?: boolean;
  imageUrl?: string;
};

export default function HealthBlackBox({
  usedBytes = 0,
  files = 0,
  quotaBytes = 2 * 1024 * 1024 * 1024,
  userId = "—",
  lastBackup = "—",
  anomaly = true,
  encrypted = true,
  imageUrl,
}: Props) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section className="rounded-2xl p-5 sm:p-6 bg-slate-900/70 backdrop-blur border border-slate-800 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-16 w-16 rounded-xl ring-2 ring-cyan-400/40 border border-slate-700 bg-slate-950 overflow-hidden flex items-center justify-center">
            {imageUrl && imgOk ? (
              <img
                src={imageUrl}
                alt="Health Black Box"
                loading="eager"
                className="h-full w-full object-contain"
                onError={() => setImgOk(false)}
              />
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-cyan-300"
                aria-hidden="true"
              >
                <path
                  d="M4 7.5A2.5 2.5 0 0 1 6.5 5H17a2 2 0 0 1 2 2v10.5A1.5 1.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5V7.5Z"
                  fill="currentColor"
                />
                <circle cx="13.5" cy="11.5" r="2.25" fill="currentColor" />
                <path
                  d="M13.5 9.25v4.5M11.25 11.5h4.5"
                  stroke="#22d3ee"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-100">
              Health Black Box
            </h2>
            <p className="text-xs text-slate-300">
              Secure personal health vault
            </p>
          </div>
        </div>
      </div>

      {/* Top indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-300 mb-1">
            Security
          </div>
          <ul className="text-sm text-slate-100 space-y-1">
            <li className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {`Encryption: ${encrypted ? "AES-256 (on)" : "Off"}`}
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
              {`Last backup: ${lastBackup}`}
            </li>
            <li className="flex items-center gap-2">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${anomaly ? "bg-emerald-400" : "bg-amber-400"}`}
              />
              {`Anomaly detection: ${anomaly ? "Active" : "Paused"}`}
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-300 mb-1">
            Compliance
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-700/40">
              HIPAA-aligned
            </span>
            <span className="text-xs px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-700/40">
              Zero-Trust
            </span>
            <span className="text-xs px-2 py-1 rounded-lg bg-sky-500/10 text-sky-300 border border-sky-700/40">
              At-Rest + In-Transit
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-300 mb-2">
            Quick actions
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/member/files"
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs text-slate-100"
            >
              View files
            </Link>
            <Link
              href="/member/settings"
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs text-slate-100"
            >
              Settings
            </Link>
            <button
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs text-slate-100"
              onClick={async () => {
                try {
                  const res = await fetch("/api/hbx/backup", {
                    method: "POST",
                  });
                  const data = await res.json();
                  alert(`Backup ${data.status} at ${data.startedAt}`);
                } catch {
                  alert("Failed to start backup");
                }
              }}
            >
              Backup now
            </button>
          </div>
        </div>
      </div>

      <UsageCard
        className="mt-2"
        userId={userId}
        totalBytes={usedBytes}
        files={files}
        quotaBytes={quotaBytes}
        visual="thick"
      />
    </section>
  );
}
