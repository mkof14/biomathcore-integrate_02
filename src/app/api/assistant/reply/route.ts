import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildPatientContext } from "@/server/assistant/context";
import { retrieveUserContext } from "@/server/rag/retriever";
import { buildSystemPrompt } from "@/server/assistant/prompt";
import { buildFallbackReply } from "@/server/assistant/fallback";
import { safeParseAssistantJSON, AssistantJSON } from "@/server/assistant/schemas";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const startedAt = Date.now();

  const respondOK = (
    reply: string,
    facts: Array<{ sourceId: string; sourceType: string; text: string; score?: number }>,
    meta: Record<string, any>
  ) =>
    NextResponse.json(
      {
        reply,
        facts: facts.map((f, i) => ({
          n: i + 1,
          sourceId: f.sourceId,
          sourceType: f.sourceType,
          score: f.score != null ? Math.round(f.score * 1000) / 1000 : undefined,
          text: f.text.slice(0, 500),
        })),
        debug: { ms: Date.now() - startedAt, ...meta },
      },
      { status: 200 }
    );

  try {
    const body = await req.json().catch(() => ({} as any));
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const lang = (typeof body?.lang === "string" ? body.lang : "en").toLowerCase();
    if (!message) return NextResponse.json({ reply: "Please type your message." }, { status: 200 });

    const userId = body?.userId || "U1001";

    // 1) Контекст пациента
    const ctx = await buildPatientContext(userId);
    // 2) Факты RAG
    const facts = await retrieveUserContext(userId, message, 8);

    // Без ключа — офлайн-фолбэк
    if (!process.env.OPENAI_API_KEY) {
      const fb = buildFallbackReply(ctx, facts, lang, message);
      return respondOK(fb.answer, facts, { fallback: true, reason: "NO_KEY" });
    }

    // 3) System prompt (строгий JSON)
    const age = ctx.user.birthDate
      ? Math.max(0, Math.floor((Date.now() - Date.parse(ctx.user.birthDate)) / (365.25 * 24 * 3600 * 1000)))
      : undefined;

    const system = buildSystemPrompt(
      {
        name: ctx.user.name ?? undefined,
        gender: ctx.user.gender ?? undefined,
        age,
        conditions: ctx.user.conditions,
        allergies: ctx.user.allergies,
        medications: ctx.user.medications,
        locale: lang,
      },
      facts.map((f) => ({ text: f.text, sourceId: f.sourceId, sourceType: f.sourceType as "form"|"report"|"file" }))
    );

    // 4) Вызов модели
    const completion = await client.chat.completions.create({
      model: process.env.AI_MODEL || "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        { role: "system", content: system },
        { role: "user", content: message },
      ],
    });

    const raw = completion.choices?.[0]?.message?.content?.trim() || "";
    let parsed: AssistantJSON | null = safeParseAssistantJSON(raw);

    // Быстрый «фаззи»-парс: иногда модель окружает JSON мусором → попробуем вырезать {...}
    if (!parsed) {
      const m = raw.match(/\{[\s\S]*\}$/);
      if (m) parsed = safeParseAssistantJSON(m[0]);
    }

    if (parsed) {
      // валидный JSON-пакет
      return NextResponse.json(
        {
          reply: parsed.answer,
          citations: Array.isArray(parsed.citations) ? parsed.citations : [],
          facts: facts.map((f, i) => ({
            n: i + 1,
            sourceId: f.sourceId,
            sourceType: f.sourceType,
            score: f.score != null ? Math.round(f.score * 1000) / 1000 : undefined,
            text: f.text.slice(0, 500),
          })),
          debug: { model: process.env.AI_MODEL || "gpt-4o-mini", json: true, ms: Date.now() - startedAt },
        },
        { status: 200 }
      );
    }

    // Если модель вернула не-JSON — отдаём как текст
    const replyText = raw || "Thanks — I’m here to help.";
    return respondOK(replyText, facts, { model: process.env.AI_MODEL || "gpt-4o-mini", json: false });

  } catch (err: any) {
    console.error("[assistant/reply] ERROR:", {
      name: err?.name,
      status: err?.status,
      message: err?.message,
      data: err?.response?.data ?? err?.error ?? null,
    });

    // Фолбэк без LLM
    try {
      const body = await req.json().catch(() => ({} as any));
      const message = typeof body?.message === "string" ? body.message.trim() : "";
      const lang = (typeof body?.lang === "string" ? body.lang : "en").toLowerCase();
      const userId = body?.userId || "U1001";
      const ctx = await buildPatientContext(userId);
      const facts = await retrieveUserContext(userId, message || "health summary", 8);
      const fb = buildFallbackReply(ctx, facts, lang, message);
      return NextResponse.json(
        {
          reply: fb.answer,
          citations: fb.citations ?? [],
          facts: facts.map((f, i) => ({
            n: i + 1,
            sourceId: f.sourceId,
            sourceType: f.sourceType,
            text: f.text.slice(0, 500),
          })),
          debug: { fallback: true, status: err?.status ?? 500 },
        },
        { status: 200 }
      );
    } catch (e) {
      let hint = "AI backend is not reachable.";
      if (err?.status === 401) hint = "API key is invalid or missing.";
      if (err?.status === 429) hint = "Rate limited. Try again later.";
      if (err?.status === 404) hint = "Model not found. Check AI_MODEL.";
      return NextResponse.json(
        { reply: "Sorry, I’m offline right now.", debug: { hint, status: err?.status ?? 500 } },
        { status: 200 }
      );
    }
  }
}
