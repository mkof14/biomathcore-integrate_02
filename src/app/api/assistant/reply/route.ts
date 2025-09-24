import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildPatientContext } from "@/server/assistant/context";
import { retrieveUserContext } from "@/server/rag/retriever";
import { buildSystemPrompt } from "@/server/assistant/prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const startedAt = Date.now();
  try {
    const body = await req.json().catch(() => ({} as any));
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const lang = (typeof body?.lang === "string" ? body.lang : "en").toLowerCase();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ reply: "AI key is missing.", debug: { code: "NO_KEY" } }, { status: 200 });
    }
    if (!message) {
      return NextResponse.json({ reply: "Please type your message." }, { status: 200 });
    }

    // TODO: заменить демо-набросок на реальную авторизацию (next-auth/guard)
    const userId = body?.userId || "U1001";

    // 1) Полный контекст пациента из БД
    const ctx = await buildPatientContext(userId);

    // 2) RAG: релевантные факты под вопрос
    const facts = await retrieveUserContext(userId, message, 8);

    // 3) System prompt на базе профиля и фактов
    const age = ctx.user.birthDate ? Math.max(0, Math.floor((Date.now() - Date.parse(ctx.user.birthDate)) / (365.25 * 24 * 3600 * 1000))) : undefined;
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
      facts.map(f => ({ text: f.text, sourceId: f.sourceId, sourceType: f.sourceType }))
    );

    // 4) Вызов модели
    const completion = await client.chat.completions.create({
      model: process.env.AI_MODEL || "gpt-4o-mini",
      temperature: 0.3,
      messages: [
        { role: "system", content: system },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() || "Thanks — I’m here to help.";

    return NextResponse.json(
      {
        reply,
        facts: facts.map((f, i) => ({
          n: i + 1,
          sourceId: f.sourceId,
          sourceType: f.sourceType,
          score: Math.round(f.score * 1000) / 1000,
          text: f.text.slice(0, 500),
        })),
        debug: {
          ms: Date.now() - startedAt,
          model: process.env.AI_MODEL || "gpt-4o-mini",
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    const log = {
      name: err?.name,
      status: err?.status,
      message: err?.message,
      data: err?.response?.data ?? err?.error ?? null,
      ms: Date.now() - startedAt,
    };
    console.error("[assistant/reply] ERROR:", log);

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
