/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";

type Field =
  | { name: string; label: string; type: "text" | "textarea"; required?: boolean }
  | { name: string; label: string; type: "number"; required?: boolean; min?: number; max?: number }
  | { name: string; label: string; type: "select"; required?: boolean; options: string[] }
  | { name: string; label: string; type: "checkbox"; required?: boolean };

// базовые поля
const BASE: Field[] = [
  { name: "fullName", label: "Full name", type: "text", required: true },
  { name: "age", label: "Age", type: "number", required: true, min: 1, max: 120 },
  { name: "sex", label: "Sex", type: "select", required: true, options: ["Female","Male","Other"] },
  { name: "goals", label: "Main health goals", type: "textarea" },
  { name: "consent", label: "I consent to store and process my data for care", type: "checkbox", required: true },
];

// правила расширения по slug категории
const EXTRA_BY_CATEGORY: Record<string, Field[]> = {
  "sleep-recovery": [
    { name: "sleepHours", label: "Average sleep hours", type: "number", min: 0, max: 24 },
    { name: "sleepQuality", label: "Sleep quality (1–10)", type: "number", min: 1, max: 10 },
  ],
  "fitness-performance": [
    { name: "activityLevel", label: "Activity level", type: "select", options: ["Low","Medium","High"] },
    { name: "trainingGoals", label: "Training goals", type: "textarea" },
  ],
  "mental-wellness": [
    { name: "stressLevel", label: "Stress level (1–10)", type: "number", min: 1, max: 10 },
    { name: "moodNotes", label: "Mood notes", type: "textarea" },
  ],
  "nutrition-diet": [
    { name: "dietStyle", label: "Diet style", type: "select", options: ["Balanced","Keto","Vegan","Other"] },
  ],
};

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({ /* TODO: implement or remove */ }));
  const categories = Array.isArray((body as unknown).categories) ? (body as unknown).categories as string[] : [];

  // собрать уникальные extra-поля по выбранным категориям
  const extras: Field[] = [];
  for (const slug of categories) {
    const add = EXTRA_BY_CATEGORY[slug];
    if (add) extras.push(...add);
  }

  // базовые + добавочные
  const fields = [...BASE, ...extras];

  return NextResponse.json({ questionnaireId: "dynamic-intake", fields, categories });
}
