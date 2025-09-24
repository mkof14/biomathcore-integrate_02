import { useCallback, useEffect, useRef, useState } from "react";

type RecState = "idle" | "listening" | "error";

type StartOpts = {
  onInterim?: (text: string) => void;
  onFinal?: (text: string) => void;
  locale?: string; // BCP-47, e.g. "en-US"
};

export function useVoice(defaultLocale: string = "en-US") {
  const [recState, setRecState] = useState<RecState>("idle");
  const [volume, setVolume] = useState(0); // 0..1
  const recognitionRef = useRef<any>(null);

  // VU-meter refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  // 🔇 На всякий случай глушим любые «хвосты» TTS при монтировании
  useEffect(() => {
    try { window.speechSynthesis.cancel(); } catch {}
  }, []);

  const stopVU = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    try { sourceRef.current?.disconnect(); } catch {}
    try { analyserRef.current?.disconnect(); } catch {}
    try { mediaStreamRef.current?.getTracks().forEach(t => t.stop()); } catch {}
    try { audioCtxRef.current?.close(); } catch {}
    sourceRef.current = null;
    analyserRef.current = null;
    mediaStreamRef.current = null;
    audioCtxRef.current = null;
    setVolume(0);
  }, []);

  const startVU = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
      const ctx = new Ctx();
      audioCtxRef.current = ctx;
      const src = ctx.createMediaStreamSource(stream);
      sourceRef.current = src;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyserRef.current = analyser;
      src.connect(analyser);

      const data = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          const v = (data[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / data.length);
        setVolume(Math.max(0, Math.min(1, rms * 3)));
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      // ignore
    }
  }, []);

  const startListening = useCallback((opts: StartOpts = {}) => {
    const { onInterim, onFinal, locale = defaultLocale } = opts;
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setRecState("error");
      return;
    }

    startVU().catch(()=>{});

    const rec = new SR();
    recognitionRef.current = rec;
    rec.lang = locale;
    rec.interimResults = true;
    rec.continuous = true;

    rec.onstart = () => setRecState("listening");
    rec.onerror = () => setRecState("error");
    rec.onend = () => { setRecState("idle"); stopVU(); };
    rec.onresult = (e: any) => {
      let interim = "";
      let finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        const text = res[0]?.transcript ?? "";
        if (res.isFinal) finalText += text;
        else interim += text;
      }
      if (interim && onInterim) onInterim(interim);
      if (finalText && onFinal) onFinal(finalText.trim());
    };

    try { rec.start(); } catch { setRecState("error"); stopVU(); }
  }, [defaultLocale, startVU, stopVU]);

  const stopListening = useCallback(() => {
    const rec = recognitionRef.current;
    if (rec) { try { rec.stop(); } catch {} }
    setRecState("idle");
    stopVU();
  }, [stopVU]);

  // Text To Speech
  const speak = useCallback((text: string, voiceLang = defaultLocale) => {
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = voiceLang;
      window.speechSynthesis.speak(u);
    } catch {}
  }, [defaultLocale]);

  const stopSpeak = useCallback(() => {
    try { window.speechSynthesis.cancel(); } catch {}
  }, []);

  useEffect(() => {
    return () => {
      stopListening();
      stopVU();
    };
  }, [stopListening, stopVU]);

  return { recState, startListening, stopListening, speak, stopSpeak, volume };
}

export function langToLocale(lang: string): string {
  switch (lang) {
    case "en": return "en-US";
    case "es": return "es-ES";
    case "de": return "de-DE";
    case "fr": return "fr-FR";
    case "ru": return "ru-RU";
    default: return "en-US";
  }
}
