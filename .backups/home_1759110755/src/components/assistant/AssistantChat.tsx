"use client";

import { useEffect, useRef, useState } from "react";
import * as A from "@/lib/i18n-assistant";
import { useVoice, langToLocale } from "@/components/assistant/useVoice";

type Msg = { role: "user" | "assistant"; content: string };

function MicIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 1 0 6 0V6a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <path d="M12 19v3" />
      {active ? <circle cx="20" cy="4" r="3" fill="currentColor" /> : null}
    </svg>
  );
}
function SpeakerIcon({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 10v4h3l5 4V6l-5 4H5Z" />
      {on ? (
        <>
          <path d="M16 9a4 4 0 0 1 0 6" />
          <path d="M18 7a7 7 0 0 1 0 10" />
        </>
      ) : null}
    </svg>
  );
}

// Classic VU bars
function VuBars({ volume }: { volume: number }) {
  const bars = 8;
  const active = Math.round(volume * bars);
  return (
    <div className="flex items-end gap-[2px] h-5 w-16 bg-slate-800/80 rounded px-[2px] py-[2px] border border-slate-700">
      {Array.from({ length: bars }).map((_, i) => {
        const filled = i < active;
        return (
          <div
            key={i}
            className={`flex-1 rounded-sm transition-all duration-100 ${
              filled ? "bg-gradient-to-t from-emerald-400 to-cyan-400" : "bg-slate-700/60"
            }`}
            style={{ height: `${((i + 1) / bars) * 100}%` }}
          />
        );
      })}
    </div>
  );
}

export default function AssistantChat({
  initialLang = "en",
  hideHeader = false,
  controlledLang,
  onLangChange,
  onAssistantReply, // 🔔 notify parent when assistant replies
}: {
  initialLang?: A.Lang;
  hideHeader?: boolean;
  controlledLang?: A.Lang;
  onLangChange?: (l: A.Lang) => void;
  onAssistantReply?: (text: string) => void;
}) {
  const [localLang, setLocalLang] = useState<A.Lang>(initialLang);
  const lang = controlledLang ?? localLang;
  const setLang = onLangChange ?? setLocalLang;

  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: A.t(lang, "intro_assistant") },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // TTS disabled by default; persist user choice
  const [ttsEnabled, setTtsEnabled] = useState(false);
  useEffect(() => { try { const s = localStorage.getItem("ai_tts_enabled"); if (s!=null) setTtsEnabled(s==="1"); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem("ai_tts_enabled", ttsEnabled ? "1":"0"); } catch {} }, [ttsEnabled]);

  const endRef = useRef<HTMLDivElement>(null);

  const locale = langToLocale(lang);
  const { recState, startListening, stopListening, speak, stopSpeak, volume } = useVoice(locale);
  const listening = recState === "listening";

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  // Speak only when user enabled TTS
  useEffect(() => {
    if (!ttsEnabled) return;
    const last = messages[messages.length - 1];
    if (last?.role === "assistant" && last.content) speak(last.content, locale);
  }, [messages, ttsEnabled, speak, locale]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    setMessages((m) => [...m, { role: "user", content }]);
    setInput("");
    setIsTyping(true);
    try {
      const res = await fetch("/api/assistant/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "U1001", message: content, lang }),
      }).catch(() => null);
      let reply = "";
      if (res && res.ok) {
        const data = await res.json();
        reply = data?.reply || "";
      }
      if (!reply) reply = "Thanks — I’m here to help. Tell me more.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      // 🔔 notify parent (FAB) for unread pulse
      try { onAssistantReply?.(reply); } catch {}
    } catch {
      const err = "Sorry, something went wrong.";
      setMessages((m) => [...m, { role: "assistant", content: err }]);
      try { onAssistantReply?.(err); } catch {}
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-600/70 bg-slate-900/80 p-4 sm:p-5 space-y-4">
      {!hideHeader && (
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-slate-100">AI Health Assistant</div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-300/80">{A.t(lang, "language")}:</span>
            <select
              className="rounded bg-slate-800/90 border border-slate-600 text-slate-100 px-2 py-1"
              value={lang}
              onChange={(e) => setLang(e.target.value as A.Lang)}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
              <option value="fr">Français</option>
              <option value="ru">Русский</option>
            </select>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3 h-[50vh] min-h-[360px] overflow-y-auto space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[80%] ${m.role === "assistant" ? "mr-auto" : "ml-auto"}`}>
            <div
              className={`px-3 py-2 rounded-lg text-sm shadow-sm ${
                m.role === "assistant"
                  ? "bg-cyan-950/40 text-cyan-100 border border-cyan-500/30"
                  : "bg-emerald-600/80 text-white border border-emerald-300/30"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="text-cyan-300/80 text-xs">Typing…</div>
        )}
        <div ref={endRef} />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 items-stretch">
        <div className="flex-1 flex items-center gap-2">
          {/* Mic + VU */}
          <button
            type="button"
            onClick={() =>
              listening
                ? stopListening()
                : startListening({
                    locale,
                    onInterim: (txt) => setInput(txt),
                    onFinal: (txt) => { setInput(txt); void send(txt); },
                  })
            }
            title={listening ? "Stop mic" : "Start mic"}
            className={`px-2 py-2 rounded-lg border text-sm ${
              listening
                ? "bg-emerald-600/80 border-emerald-400 text-white"
                : "bg-slate-800/90 border-slate-600 text-slate-100 hover:bg-slate-800"
            }`}
            aria-pressed={listening}
          >
            <MicIcon active={listening} />
          </button>

          <VuBars volume={volume} />

          {/* Speaker (TTS) */}
          <button
            type="button"
            onClick={() => {
              const next = !ttsEnabled;
              setTtsEnabled(next);
              if (!next) { stopSpeak(); }
            }}
            title={ttsEnabled ? "Voice: on" : "Voice: off"}
            className={`px-2 py-2 rounded-lg border text-sm ${
              ttsEnabled
                ? "bg-cyan-600/80 border-cyan-400 text-white"
                : "bg-slate-800/90 border-slate-600 text-slate-100 hover:bg-slate-800"
            }`}
            aria-pressed={ttsEnabled}
          >
            <SpeakerIcon on={ttsEnabled} />
          </button>

          {/* Input */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(); }
            }}
            placeholder={A.t(lang, "inputPlaceholder")}
            className="flex-1 px-3 py-2 rounded-lg bg-slate-800/90 border border-slate-600 text-slate-100 placeholder:text-slate-300"
          />
        </div>

        <button
          onClick={() => void send()}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-medium ring-1 ring-white/20 hover:brightness-110"
        >
          {A.t(lang, "send")}
        </button>
      </div>
    </div>
  );
}
