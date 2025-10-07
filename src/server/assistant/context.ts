import { getPrisma } from "@/server/util/prisma";

export type PatientContext = {
  user: {
    id: string;
    name?: string | null;
    gender?: string | null;
    birthDate?: string | null;
    allowPersonalization: boolean;
    conditions: string[];
    allergies: string[];
    medications: string[];
  };
  forms: Array<{ id: string; title: string }>;
  reports: Array<{
    id: string;
    title: string;
    kind: string;
    summary?: string | null;
    createdAt: string;
  }>;
  chat: Array<{
    role: "user" | "assistant";
    content: string;
    createdAt: string;
  }>;
};

function toStrArr(v: any): string[] {
  if (Array.isArray(v)) return v.map(String);
  if (v && typeof v === "object") {
    try {
      return Object.values(v).map(String);
    } catch {
      return [];
    }
  }
  return [];
}

export async function buildPatientContext(
  userId: string,
): Promise<PatientContext> {
  const prisma = getPrisma();

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error(`User ${userId} not found`);

  const [forms, reports, chat] = await Promise.all([
    prisma.form.findMany({
      where: { userId },
      select: { id: true, title: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.report.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        kind: true,
        summary: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.chatMessage.findMany({
      where: { userId },
      select: { role: true, content: true, createdAt: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);

  return {
    user: {
      id: user.id,
      name: user.name ?? null,
      gender: user.gender ?? null,
      birthDate: user.birthDate ? user.birthDate.toISOString() : null,
      allowPersonalization: !!user.allowPersonalization,
      conditions: toStrArr(user.conditions),
      allergies: toStrArr(user.allergies),
      medications: toStrArr(user.medications),
    },
    forms: forms.map((f) => ({ id: f.id, title: f.title })),
    reports: reports.map((r) => ({
      id: r.id,
      title: r.title,
      kind: r.kind,
      summary: r.summary ?? null,
      createdAt: r.createdAt.toISOString(),
    })),
    chat: chat
      .map((m) => ({
        role: (m.role === "assistant" ? "assistant" : "user") as
          | "user"
          | "assistant",
        content: m.content,
        createdAt: m.createdAt.toISOString(),
      }))
      .reverse(),
  };
}
