/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from 'next/server';
export function toJsonError(e: unknown) {
  const status = (e as unknown)?.status ?? 500;
  const message = (e as unknown)?.message ?? 'Internal Error';
  return NextResponse.json({ error: message }, { status });
}
