import { test, expect } from '@playwright/test';

test('@smoke status endpoint responds', async ({ request }) => {
  const r = await request.get('/api/status');
  expect(r.status()).toBeGreaterThanOrEqual(200);
  expect(r.status()).toBeLessThan(600);
  const j = await r.json();
  expect(j).toHaveProperty('ok');
  expect(j).toHaveProperty('uptime');
});
