import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { sendPasswordReset } from "@/lib/mail";

function sha256(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email)
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    const norm = String(email).trim().toLowerCase();

    const user = await prisma.user.findUnique({ where: { email: norm } });
    // одинаковый ответ, чтобы не раскрывать наличие пользователя
    if (!user) return NextResponse.json({ ok: true });

    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

    const rawToken = crypto.randomBytes(20).toString("hex");
    const tokenHash = sha256(rawToken);
    const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 мин

    await prisma.passwordResetToken.create({
      data: { tokenHash, userId: user.id, expiresAt: expires },
    });

    const base =
      process.env.APP_URL ||
      process.env.NEXTAUTH_URL ||
      "http://localhost:3000";
    const link = `${base}/auth/reset-password?token=${rawToken}`;

    await sendPasswordReset(user.email, link);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
