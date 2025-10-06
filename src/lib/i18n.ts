export type Lang = "en" | "es" | "fr" | string;

const DICT = {
  en: {
    language: "Language",
    intro_assistant: "Assistant",
    title: "Title",
    subtitle: "Subtitle",
    send: "Send",
    mic: "Mic",
    ttsOn: "TTS On",
    ttsOff: "TTS Off",
    clear: "Clear",
    listening: "Listening",
    speaking: "Speaking",
    inputPlaceholder: "Type a message…",
    stop: "Stop",
  },
} as const;

export default function useI18n() {
  // extremely small shim; wire into your real store if you have one
  let lang: Lang =
    (typeof navigator !== "undefined" &&
      (navigator as any).language?.slice(0, 2)) ||
    "en";
  const setLang = (l: Lang) => {
    lang = l;
  };
  const i18n = {
    t: (l: Lang, key: keyof (typeof DICT)["en"]) =>
      (DICT as any)[l]?.[key] ?? (DICT as any).en?.[key] ?? String(key),
  };
  const t = (key: keyof (typeof DICT)["en"]) => i18n.t(lang, key);
  return { lang, setLang, t, i18n };
}
