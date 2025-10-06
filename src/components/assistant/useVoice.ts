import { useEffect, useRef } from "react";

export function useVoice(onLevel?: (v: number) => void) {
  const raf = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;

    async function run() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new AudioContext();
      const src = ctx.createMediaStreamSource(stream);
      const processor = ctx.createScriptProcessor(2048, 1, 1);

      src.connect(processor);
      processor.connect(ctx.destination);

      processor.onaudioprocess = (e: any) => {
        const input = e.inputBuffer.getChannelData(0);
        let max = 0;
        for (let i = 0; i < input.length; i++) {
          const v = Math.abs(input[i]);
          if (v > max) max = v;
        }
        if (onLevel) onLevel(max);
      };
    }

    if (mounted) run().catch(() => {});

    return () => {
      mounted = false;
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [onLevel]);

  function levelFromU8(data: Uint8Array, i: number) {
    const sample = data?.[i] ?? 128;
    const v = (sample - 128) / 128;
    return Math.max(-1, Math.min(1, v));
  }

  return { levelFromU8 };
}

/** helper: map app language to BCP-47 locale for Web Speech API */
export const langToLocale = (lang: string): string => {
  const map: Record<string, string> = {
    en: "en-US",
    enUS: "en-US",
    enGB: "en-GB",
    ru: "ru-RU",
    es: "es-ES",
    fr: "fr-FR",
    de: "de-DE",
    it: "it-IT",
    pt: "pt-PT",
    ptBR: "pt-BR",
    zh: "zh-CN",
    ja: "ja-JP",
    ko: "ko-KR",
  };
  return (
    map[lang] ?? (lang.includes("-") ? lang : `${lang}-${lang.toUpperCase()}`)
  );
};
