"use client";

import { Lang } from "@/lib/i18n";

export default function LanguageSwitch({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-slate-300">
      <span>Language</span>
      <select
        className="rounded-lg bg-slate-800 border border-slate-600 text-slate-100 px-2 py-1"
        value={lang}
        onChange={(e: any) => onChange(e.target.value as Lang)}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="de">Deutsch</option>
        <option value="fr">Français</option>
        <option value="ru">Русский</option>
      </select>
    </label>
  );
}
