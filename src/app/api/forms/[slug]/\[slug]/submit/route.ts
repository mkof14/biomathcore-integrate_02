import { NextResponse } from "next/server";

export async function POST(req: Request, ctx: { params: { slug: string } }) {
  const { slug } = ctx.params;
  let body: unknown = null;
  try {
    body = await req.json();
  } catch {}
  return NextResponse.json({ ok: true, slug, body });
}
