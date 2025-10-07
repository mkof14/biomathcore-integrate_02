export type Lang = "en" | "es" | "de" | "fr" | "ru";

export const dict = {
  en: {
    title: "AI Health Assistant",
    subtitle: "Talk, type, listen, and speak.",
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
    intro_assistant:
      "Hello! I'm your AI Health Assistant. How can I help today?",
    typing: "Assistant is typing",
  },
  es: {
    title: "Asistente de Salud IA",
    subtitle: "Habla, escribe, escucha y habla.",
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
    intro_assistant:
      "¡Hola! Soy tu asistente de salud IA. ¿En qué puedo ayudar hoy?",
    typing: "El asistente está escribiendo",
  },
  de: {
    title: "KI-Gesundheitsassistent",
    subtitle: "Sprechen, tippen, zuhören und sprechen.",
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
    intro_assistant:
      "Hallo! Ich bin dein KI-Gesundheitsassistent. Womit kann ich helfen?",
    typing: "Assistent tippt",
  },
  fr: {
    title: "Assistant de santé IA",
    subtitle: "Parlez, écrivez, écoutez et parlez.",
    inputPlaceholder: "Tapez votre message…",
    send: "Envoyer",
    speaking: "Parle…",
    listening: "Écoute…",
    mic: "Micro",
    stop: "Arrêter",
    ttsOn: "Voix",
    ttsOff: "Muet",
    clear: "Effacer",
    language: "Langue",
    intro_assistant:
      "Bonjour ! Je suis votre assistant santé IA. Comment puis-je aider ?",
    typing: "L’assistant est en train d’écrire",
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
    intro_assistant:
      "Здравствуйте! Я ваш AI Health Assistant. Чем могу помочь?",
    typing: "Ассистент печатает",
  },
} as const;

export function t(lang: Lang, key: keyof (typeof dict)["en"]) {
  const pack = (dict as any)[lang] ?? dict.en;
  return pack[key] ?? dict.en[key];
}

export default { t, dict };
