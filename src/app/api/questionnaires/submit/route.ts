import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/app/lib/prisma";

const AnswerValue = z.union([z.string(), z.number()]);
const SubmitPayloadSchema = z.object({
  plan: z.enum(["STANDARD","PREMIUM","MAX"]),
  metricMode: z.enum(["percent","score","level"]),
  answers: z.record(AnswerValue),
  elapsedSec: z.number().optional(),
  changes: z.number().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = SubmitPayloadSchema.parse(body);

    const mergedAnswers = {
      ...payload.answers,
      _meta: {
        elapsedSec: payload.elapsedSec ?? null,
        changes: payload.changes ?? null,
      },
    };

    const record = await prisma.questionnaireResponse.create({
      data: {
        userId: null,
        plan: payload.plan,
        metricMode: payload.metricMode,
        answers: mergedAnswers as any,
      },
    });

    return NextResponse.json({ ok: true, id: record.id }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}
