export type Lang = "en" | "es" | "de" | "fr" | "ru";

export const i18n = {
  en: {
    title: "AI Health Assistant",
    subtitle: "Talk, type, and get guidance. (Voice in/out supported)",
    inputPlaceholder: "Type your message…",
    send: "Send",
    speaking: "Speaking…",
    listening: "Listening…",
    mic: "Mic",
    stop: "Stop",
    ttsOn: "Voice",
    ttsOff: "Mute",
    clear: "Clear",
    language: "Language",
    intro_assistant: "Hello! I’m your AI Health Assistant. How can I help you today?",
  },
  es: {
    title: "Asistente de Salud IA",
    subtitle: "Habla, escribe y recibe ayuda. (Voz in/out)",
    inputPlaceholder: "Escribe tu mensaje…",
    send: "Enviar",
    speaking: "Hablando…",
    listening: "Escuchando…",
    mic: "Micrófono",
    stop: "Detener",
    ttsOn: "Voz",
    ttsOff: "Silencio",
    clear: "Limpiar",
    language: "Idioma",
    intro_assistant: "¡Hola! Soy tu asistente de salud con IA. ¿En qué puedo ayudarte?",
  },
  de: {
    title: "KI-Gesundheitsassistent",
    subtitle: "Sprechen, schreiben, Hilfe erhalten. (Stimme in/out)",
    inputPlaceholder: "Nachricht eingeben…",
    send: "Senden",
    speaking: "Spricht…",
    listening: "Hört zu…",
    mic: "Mikro",
    stop: "Stopp",
    ttsOn: "Stimme",
    ttsOff: "Stumm",
    clear: "Leeren",
    language: "Sprache",
    intro_assistant: "Hallo! Ich bin dein KI-Gesundheitsassistent. Wobei kann ich helfen?",
  },
  fr: {
    title: "Assistant de santé IA",
    subtitle: "Parlez, écrivez et obtenez de l'aide. (Voix in/out)",
    inputPlaceholder: "Tapez votre message…",
    send: "Envoyer",
    speaking: "Parole…",
    listening: "Écoute…",
    mic: "Micro",
    stop: "Arrêter",
    ttsOn: "Voix",
    ttsOff: "Muet",
    clear: "Effacer",
    language: "Langue",
    intro_assistant: "Bonjour ! Je suis votre assistant santé IA. Comment puis-je aider ?",
  },
  ru: {
    title: "AI Health Assistant",
    subtitle: "Разговаривайте и пишите. (Голос in/out)",
    inputPlaceholder: "Введите сообщение…",
    send: "Отправить",
    speaking: "Говорю…",
    listening: "Слушаю…",
    mic: "Микрофон",
    stop: "Стоп",
    ttsOn: "Голос",
    ttsOff: "Без звука",
    clear: "Очистить",
    language: "Язык",
    intro_assistant: "Здравствуйте! Я ваш AI Health Assistant. Чем могу помочь?",
  },
} as const;

export function t(lang: Lang, key: keyof typeof i18n["en"]) {
  const pack = (i18n as any)[lang] ?? i18n.en;
  return (pack as any)[key] ?? (i18n.en as any)[key];
}

const defaultExport = { t, i18n };
export default defaultExport;
