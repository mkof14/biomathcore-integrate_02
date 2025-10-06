import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { prisma } from "@/lib/db";

function sha256(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();
    if (!token || !password)
      return NextResponse.json({ error: "Bad payload" }, { status: 400 });

    const tokenHash = sha256(String(token));
    const rec = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!rec || rec.expiresAt < new Date()) {
      if (rec?.id)
        await prisma.passwordResetToken
          .delete({ where: { id: rec.id } })
          .catch(() => {});
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 },
      );
    }

    const hash = await bcrypt.hash(String(password), 10);
    await prisma.user.update({
      where: { id: rec.userId },
      data: { passwordHash: hash },
    });
    await prisma.passwordResetToken.delete({ where: { id: rec.id } });

    return NextResponse.json({ ok: true, email: rec.user.email });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
