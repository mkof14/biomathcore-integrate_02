/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth/server";

const prisma = new PrismaClient();

function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, ...data } as unknown, init);
}
function bad(status: number, code: string, extra?: Record<string, unknown>) {
  return NextResponse.json(
    {
      ok: false,
      error: code,
      ...(extra ||
        {
          /* TODO: implement or remove */
        }),
    },
    { status },
  );
}

type Params = { params: { id: string } };

export async function PATCH(req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.email) return bad(401, "UNAUTHENTICATED");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email.toLowerCase() },
    select: { id: true },
  });
  if (!user) return bad(404, "USER_NOT_FOUND");

  let patch: Partial<{
    title: string;
    body: string;
    tags: string | null;
    status: string | null;
  }>;
  try {
    patch = await req.json();
  } catch {
    return bad(400, "INVALID_JSON");
  }

  const updated = await prisma.blackBoxNote.updateMany({
    where: { id: params.id, userId: user.id },
    data: {
      ...(patch.title !== undefined
        ? { title: patch.title }
        : {
            /* TODO: implement or remove */
          }),
      ...(patch.body !== undefined
        ? { body: patch.body }
        : {
            /* TODO: implement or remove */
          }),
      ...(patch.tags !== undefined
        ? { tags: patch.tags }
        : {
            /* TODO: implement or remove */
          }),
      ...(patch.status !== undefined
        ? { status: patch.status }
        : {
            /* TODO: implement or remove */
          }),
      updatedAt: new Date(),
    },
  });

  if (updated.count === 0) return bad(404, "NOTE_NOT_FOUND");

  const note = await prisma.blackBoxNote.findUnique({
    where: { id: params.id },
  });
  return ok({ note });
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.email) return bad(401, "UNAUTHENTICATED");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email.toLowerCase() },
    select: { id: true },
  });
  if (!user) return bad(404, "USER_NOT_FOUND");

  const deleted = await prisma.blackBoxNote.deleteMany({
    where: { id: params.id, userId: user.id },
  });

  if (deleted.count === 0) return bad(404, "NOTE_NOT_FOUND");

  return ok({ deleted: true });
}
