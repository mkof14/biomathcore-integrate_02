export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getPrisma } from "@/server/util/prisma";

function toStrArr(v: any): string[] {
  if (Array.isArray(v)) return v.map(String);
  return [];
}

export async function GET(req: Request) {
  const prisma = getPrisma();

  const url = new URL(req.url);
  const userId = url.searchParams.get("userId") || "U1001";

  let user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,
        email: `${userId.toLowerCase()}@example.local`,
        name: "Demo User",
        gender: "unspecified",
        allowPersonalization: true,
        conditions: [],
        allergies: [],
        medications: [],
      },
    });
  }

  const [forms, reports, files] = await Promise.all([
    prisma.form.count({ where: { userId } }),
    prisma.report.count({ where: { userId } }),
    prisma.file.count({ where: { userId } }),
  ]);

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      gender: user.gender,
      birthDate: user.birthDate,
      conditions: toStrArr(user.conditions),
      allergies: toStrArr(user.allergies),
      medications: toStrArr(user.medications),
      allowPersonalization: user.allowPersonalization,
    },
    stats: { forms, reports, files },
  });
}
