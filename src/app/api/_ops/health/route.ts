import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ ok: true, ts: Date.now(), service: 'web' });
}
export async function HEAD() { return new Response(null, { status: 200 }); }
