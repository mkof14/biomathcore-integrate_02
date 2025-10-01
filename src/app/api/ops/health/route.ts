import { NextResponse } from 'next/server';

const startedAt = Date.now();
const version =
  process.env.APP_VERSION ||
  require('../../../../../../package.json').version ||
  '0.0.0';
const commit =
  process.env.BUILD_SHA ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.GIT_COMMIT ||
  'unknown';

function json(data: any, init?: ResponseInit) {
  const res = NextResponse.json(data, init);
  res.headers.set('Cache-Control', 'no-store');
  return res;
}

export async function GET() {
  return json({
    ok: true,
    ts: Date.now(),
    service: 'web',
    version,
    commit,
    uptimeMs: Date.now() - startedAt,
    env: process.env.NODE_ENV || 'development',
  });
}

export async function HEAD() {
  return new Response(null, {
    status: 200,
    headers: { 'Cache-Control': 'no-store' },
  });
}
