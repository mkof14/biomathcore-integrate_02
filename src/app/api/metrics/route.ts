/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from 'next/server';
import { metricsJson } from '@/lib/monitoring/health';

export async function GET() {
  const m = await metricsJson();
  return NextResponse.json(m, { status: 200 });
}
