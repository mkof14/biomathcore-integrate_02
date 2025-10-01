import { test, expect } from '@playwright/test';

test('health is 200 and payload sane', async ({ request }) => {
  const res = await request.get('/api/ops/health');
  expect(res.status()).toBe(200);
  const j = await res.json();
  expect(j.ok).toBeTruthy();
  expect(j.service).toBe('web');
  expect(typeof j.version).toBe('string');
  expect(typeof j.commit).toBe('string');
  expect(j.env).toMatch(/^(development|production|test)$/);
  expect(j.uptimeMs).toBeGreaterThanOrEqual(0);
});

test('Member redirect canonicalizes', async ({ request }) => {
  const res = await request.get('/Member', { maxRedirects: 0 });
  expect(res.status()).toBeGreaterThanOrEqual(300);
  expect(res.status()).toBeLessThan(400);
  const location =
    // playwright 1.48+ returns a Headers object
    // @ts-ignore
    (typeof res.headers === 'function' ? res.headers()['location'] : res.headers().get?.('location')) ||
    res.headers()['location'];
  expect(location).toMatch(/\/member$/);
});

test('not-found route responds', async ({ request }) => {
  const r = await request.get('/__definitely_missing__');
  expect([404, 200]).toContain(r.status());
});
