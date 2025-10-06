"use client";

type UsageProps = {
  userId: string;
  totalBytes: number;
  files: number;
  quotaBytes?: number;
  className?: string;
  visual?: "normal" | "thick";
};

function toMB(bytes: number) {
  return bytes / (1024 * 1024);
}
function toGB(bytes: number) {
  return bytes / (1024 * 1024 * 1024);
}

export default function UsageCard({
  userId,
  totalBytes,
  files,
  quotaBytes = 2 * 1024 * 1024 * 1024,
  className = "",
  visual = "normal",
}: UsageProps) {
  const usedMB = toMB(totalBytes);
  const quotaMB = toMB(quotaBytes);
  const usedGB = toGB(totalBytes);
  const quotaGB = toGB(quotaBytes);
  const percent = Math.max(
    0,
    Math.min(100, Math.round((totalBytes / quotaBytes) * 100)),
  );
  const freeMB = Math.max(0, quotaMB - usedMB);
  const hasUsage = totalBytes > 0;

  const barHeight = visual === "thick" ? "h-5" : "h-3";
  const labelSize = visual === "thick" ? "text-sm" : "text-xs";

  return (
    <div
      className={`rounded-xl bg-slate-900/70 border border-slate-800 p-5 ${className}`}
    >
      <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-cyan-400"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M5 4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5Zm7 14c-2.76 0-5-2.24-5-5h2a3 3 0 1 0 6 0h2c0 2.76-2.24 5-5 5Z" />
        </svg>
        Storage usage
      </h3>

      <div className="mb-4 grid grid-cols-2 gap-4 text-sm text-slate-300">
        <div>
          <div className="text-xs text-slate-400">User</div>
          <div className="font-medium">{userId}</div>
        </div>
        <div>
          <div className="text-xs text-slate-400">Files</div>
          <div className="font-medium">{files}</div>
        </div>
        <div>
          <div className="text-xs text-slate-400">Used</div>
          <div className="font-medium">
            {usedGB >= 0.1
              ? `${usedGB.toFixed(2)} GB`
              : `${usedMB.toFixed(0)} MB`}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400">Quota</div>
          <div className="font-medium">
            {quotaGB >= 0.1
              ? `${quotaGB.toFixed(1)} GB`
              : `${quotaMB.toFixed(0)} MB`}
          </div>
        </div>
      </div>

      <div className="mb-1 flex justify-between text-xs text-slate-400">
        <span>{percent}% used</span>
        <span>{freeMB.toFixed(0)} MB free</span>
      </div>

      <div
        className={`${barHeight} rounded-lg bg-slate-800 border border-slate-700 overflow-hidden relative`}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-[width] duration-500`}
          style={{ width: hasUsage ? `max(${percent}%, 4px)` : "0%" }}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center ${labelSize} text-slate-100/90`}
        >
          {percent}%
        </div>
      </div>

      {!hasUsage && (
        <div className="mt-1 text-[11px] text-slate-500">No data yet</div>
      )}
    </div>
  );
}
