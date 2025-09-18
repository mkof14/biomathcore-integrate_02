/* MONITORING FOUNDATION */
import os from 'node:os';
import { execSync } from 'node:child_process';
import type { PrismaClient } from '@prisma/client';

let _prisma: PrismaClient | null = null;
async function getPrisma(): Promise<PrismaClient | null> {
  try {
    if (_prisma) return _prisma;
    const mod = await import('@prisma/client');
    // @ts-expect-error dynamic
    _prisma = new mod.PrismaClient();
    return _prisma;
  } catch {
    return null;
  }
}

function getCommit(): string {
  try {
    return process.env.VERCEL_GIT_COMMIT_SHA
      || execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return 'unknown';
  }
}

export async function dbHealth(): Promise<{ ok: boolean; ms?: number; error?: string }> {
  const prisma = await getPrisma();
  if (!prisma) return { ok: false, error: 'prisma_unavailable' };
  const t0 = Date.now();
  try {
    // @ts-expect-error raw
    await prisma.$queryRawUnsafe('SELECT 1');
    return { ok: true, ms: Date.now() - t0 };
  } catch (e: any) {
    return { ok: false, error: e?.message || 'db_error' };
  }
}

export async function statusSummary() {
  const ts = Date.now();
  const uptime = process.uptime();
  const node = process.version;
  const commit = getCommit();
  const platform = `${os.platform()}-${os.arch()}`;
  const mem = process.memoryUsage();
  const load = os.loadavg();
  const db = await dbHealth();

  return {
    ok: db.ok === true,
    ts,
    uptime,
    node,
    commit,
    platform,
    mem: {
      rss: mem.rss,
      heapUsed: mem.heapUsed,
      heapTotal: mem.heapTotal,
      external: mem.external
    },
    load,
    db
  };
}

export async function metricsJson() {
  const s = await statusSummary();
  return {
    ts: s.ts,
    uptime: s.uptime,
    rss: s.mem.rss,
    heapUsed: s.mem.heapUsed,
    heapTotal: s.mem.heapTotal,
    load1: s.load[0],
    load5: s.load[1],
    load15: s.load[2],
    db_ok: Number(s.db.ok),
    db_ms: s.db.ms ?? -1
  };
}
