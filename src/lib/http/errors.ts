import { NextResponse } from 'next/server';
export function toJsonError(e: unknown) {
  const status = (e as any)?.status ?? 500;
  const message = (e as any)?.message ?? 'Internal Error';
  return NextResponse.json({ error: message }, { status });
}
