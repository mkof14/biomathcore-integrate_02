import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const startedAt = Date.now();
  try {
    // --- входные данные
    const body = await req.json().catch(() => ({} as any));
    const message = typeof body?.message === "string" ? body.message : "";
    const lang = (typeof body?.lang === "string" ? body.lang : "en").toLowerCase();

    // --- базовые проверки
    if (!process.env.OPENAI_API_KEY) {
      console.error("[assistant/reply] missing OPENAI_API_KEY");
      return NextResponse.json({ reply: "AI key is missing.", debug: { code: "NO_KEY" } }, { status: 200 });
    }
    if (!message.trim()) {
      return NextResponse.json({ reply: "Please type your message." }, { status: 200 });
    }

    // --- лог входа
    console.log("[assistant/reply] IN:", { len: message.length, lang, model: process.env.AI_MODEL || "gpt-4o-mini" });

    // --- запрос к OpenAI
    const completion = await client.chat.completions.create({
      model: process.env.AI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI Health Assistant in an English UI. Be concise and supportive. You do NOT provide diagnosis or treatment. For symptoms or emergencies advise contacting a clinician or emergency services.",
        },
        { role: "user", content: message },
      ],
      temperature: 0.4,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() || "Thanks — I’m here to help.";

    // --- лог успеха
    console.log("[assistant/reply] OK:", { ms: Date.now() - startedAt, chars: reply.length });

    return NextResponse.json({ reply }, { status: 200 });
  } catch (err: any) {
    // --- детальный лог ошибки
    const log = {
      name: err?.name,
      status: err?.status,
      message: err?.message,
      data: err?.response?.data ?? err?.error ?? null,
      ms: Date.now() - startedAt,
    };
    console.error("[assistant/reply] ERROR:", log);

    // --- человекочитаемая причина
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
