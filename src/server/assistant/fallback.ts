import type { PatientContext } from "./context";

type Fact = { text: string; sourceId: string; sourceType: "form"|"report"|"file"; score?: number };

export function buildFallbackReply(ctx: PatientContext, facts: Fact[], lang: string, question: string) {
  const lines: string[] = [];

  // Заголовок
  lines.push(lang.startsWith("ru") ? "Краткое резюме по вашим данным:" : "Brief summary from your data:");

  // Профиль
  const age = ctx.user.birthDate ? Math.max(0, Math.floor((Date.now() - Date.parse(ctx.user.birthDate)) / (365.25*24*3600*1000))) : undefined;
  const profileBits = [
    ctx.user.name ? (lang.startsWith("ru") ? `Имя: ${ctx.user.name}` : `Name: ${ctx.user.name}`) : null,
    ctx.user.gender ? (lang.startsWith("ru") ? `Пол: ${ctx.user.gender}` : `Gender: ${ctx.user.gender}`) : null,
    age != null ? (lang.startsWith("ru") ? `Возраст: ${age}` : `Age: ${age}`) : null,
    ctx.user.conditions?.length ? (lang.startsWith("ru") ? `Состояния: ${ctx.user.conditions.join(", ")}` : `Conditions: ${ctx.user.conditions.join(", ")}`) : null,
    ctx.user.medications?.length ? (lang.startsWith("ru") ? `Препараты: ${ctx.user.medications.join(", ")}` : `Meds: ${ctx.user.medications.join(", ")}`) : null,
    ctx.user.allergies?.length ? (lang.startsWith("ru") ? `Аллергии: ${ctx.user.allergies.join(", ")}` : `Allergies: ${ctx.user.allergies.join(", ")}`) : null,
  ].filter(Boolean);
  if (profileBits.length) lines.push("- " + profileBits.join("; "));

  // Факты (цитаты)
  if (facts.length) {
    lines.push(lang.startsWith("ru") ? "Факты:" : "Facts:");
    facts.slice(0, 6).forEach((f, i) => {
      const label = f.sourceType;
      lines.push(`  [${i+1}] (${label} ${f.sourceId}) ${f.text.slice(0, 240)}`);
    });
  }

  // Советы (простая логика)
  const tips: string[] = [];
  const textAll = facts.map(f=>f.text.toLowerCase()).join(" ") + " " + (JSON.stringify(ctx.reports)||"").toLowerCase();
  const mentions = (s: string) => textAll.includes(s);

  if (mentions("sleep") || mentions("сон") || JSON.stringify(ctx.forms).toLowerCase().includes("sleep")) {
    tips.push(lang.startsWith("ru")
      ? "Сон: старайтесь 7–8 часов, стабильный режим, ограничьте экраны за 1 час до сна."
      : "Sleep: target 7–8 hours, keep a consistent schedule, limit screens 1h before bed.");
  }
  if (mentions("hypertension") || mentions("давлен")) {
    tips.push(lang.startsWith("ru")
      ? "Артериальное давление: контролируйте АД, минимум 150 мин умеренной активности в неделю, уменьшите соль."
      : "Blood pressure: monitor BP, aim for 150 min/week moderate activity, reduce sodium.");
  }
  if (!tips.length) {
    tips.push(lang.startsWith("ru")
      ? "Общие рекомендации: регулярная активность, питание с упором на овощи/белок, контроль сна и стресса."
      : "General: regular activity, whole-food diet, adequate sleep, stress management.");
  }
  lines.push(lang.startsWith("ru") ? "Рекомендации:" : "Recommendations:");
  tips.forEach(t => lines.push("- " + t));

  // Дисклеймер
  lines.push(lang.startsWith("ru")
    ? "Важно: это не медицинский диагноз. При острых симптомах обратитесь к врачу/неотложной помощи."
    : "Note: This is not a medical diagnosis. For urgent symptoms, contact a clinician/emergency services.");

  const answer = lines.join("\n");
  const citations = facts.slice(0, 6).map((f, i) => ({
    type: f.sourceType, id: f.sourceId, n: i+1, quote: f.text.slice(0, 180)
  }));

  return { answer, citations };
}
