/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from 'next/server';
import { statusSummary } from '@/lib/monitoring/health';

export async function GET() {
  const data = await statusSummary();
  return NextResponse.json(data, { status: data.ok ? 200 : 503 });
}
