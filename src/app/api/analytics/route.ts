import { NextResponse } from "next/server";
export async function POST() {
  return new NextResponse(null, { status: 204 });
}
export async function GET() {
  return NextResponse.json({ ok: true });
}
