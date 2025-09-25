'use client';
"use client";

import { useEffect, useState } from "react";
import AssistantChat from "@/components/assistant/AssistantChat";

function RobotIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
      <path fill="currentColor" d="M11 2a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v6a5 5 0 0 1-5 5h-6a5 5 0 0 1-5-5V8a2 2 0 0 1 2-2h2V5a2 2 0 0 1 2-2h1V2Zm-4 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm10 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"/>
    </svg>
  );
}

export default function FloatingAssistant() {
  const enabled = process.env.NEXT_PUBLIC_HEALTH_WIDGET_ENABLED === "true";
  const [open, setOpen] = useState(false);
  const [hasImg, setHasImg] = useState(true);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // clear unread when opening
  useEffect(() => { if (open) setHasUnread(false); }, [open]);

  if (!enabled) return null;

  return (
    <>
      {/* FAB */}
      <button
        id="health-assistant-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI Health Assistant"
        className={`fixed bottom-6 right-6 z-[9999] h-16 w-16 rounded-full
                   bg-slate-900/60 backdrop-blur border border-white/10
                   shadow-[0_14px_40px_rgba(139,92,246,0.35)]
                   ring-1 ring-white/10
                   transition transform hover:scale-105 active:scale-95
                   flex items-center justify-center
                   ${hasUnread ? "fab-pulse" : "hover:shadow-[0_18px_50px_rgba(56,189,248,0.45)] hover:ring-2 hover:ring-cyan-400/50"}`}
      >
        <span className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-br from-emerald-500/25 via-transparent to-cyan-500/25" />
        <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full overflow-hidden ring-2 ring-white/20 bg-slate-900">
          {hasImg ? (
            <img
              src="/images/assistant_avatar.svg"
              alt="AI Assistant"
              className="h-full w-full object-cover"
              onError={() => setHasImg(false)}
            />
          ) : (
            <RobotIcon />
          )}
        </span>
      </button>

      {/* Panel (always mounted, just toggling visibility) */}
      <div
        className={`fixed inset-0 z-[9998] flex items-end sm:items-center justify-end p-4 sm:p-6 transition
                   ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-modal={open ? "true" : undefined}
        role={open ? "dialog" : undefined}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          className={`relative z-[9999] w-full sm:w-[520px] max-w-[92vw] rounded-2xl border border-slate-700/70 bg-slate-900 shadow-2xl`}
        >
          {/* Header */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-emerald-500/10" />
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 relative">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full overflow-hidden ring-1 ring-white/15 bg-slate-800">
                  {hasImg ? (
                    <img
                      src="/images/assistant_avatar.svg"
                      alt="AI"
                      className="h-full w-full object-cover"
                      onError={() => setHasImg(false)}
                    />
                  ) : (
                    <RobotIcon />
                  )}
                </div>
                <h2 className="text-slate-100 font-semibold">AI Health Assistant</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>

          {/* Body (ALWAYS mounted) */}
          <div className="p-4">
            <AssistantChat
              hideHeader
              initialLang="en"
              onAssistantReply={(text) => {
                // if panel is closed when reply arrives — start pulsing
                if (!open && text) setHasUnread(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* Pulse animation */}
      <style jsx global>{`
        @keyframes bmc-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(56,189,248,0.55), 0 0 0 0 rgba(16,185,129,0.55); }
          70%  { box-shadow: 0 0 0 16px rgba(56,189,248,0.0), 0 0 0 30px rgba(16,185,129,0.0); }
          100% { box-shadow: 0 0 0 0 rgba(56,189,248,0.0), 0 0 0 0 rgba(16,185,129,0.0); }
        }
        .fab-pulse {
          animation: bmc-pulse 2.2s ease-out infinite;
          border-color: rgba(56,189,248,0.45) !important;
        }
      `}</style>
    </>
  );
}
