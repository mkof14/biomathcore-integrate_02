"use client";
import React, { createContext, useContext, useState } from "react";

export type Lang = "en";
type CtxVal = {
  lang: Lang;
  setLang: (l: Lang) => void;
  locale: string;
  setLocale: (s: string) => void;
  t: (key: string) => string;
};

const I18nCtx = createContext<CtxVal>({
  lang: "en",
  setLang: () => {},
  locale: "en-US",
  setLocale: () => {},
  t: (k) => k,
});

export function useI18n() {
  return useContext(I18nCtx);
}

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [locale, setLocale] = useState("en-US");
  const t = (k: string) => k;
  return (
    <I18nCtx.Provider value={{ lang, setLang, locale, setLocale, t }}>
      {children}
    </I18nCtx.Provider>
  );
}
