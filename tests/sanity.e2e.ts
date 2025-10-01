import { test, expect } from '@playwright/test';

test('health is 200 and payload sane', async ({ request }) => {
  const res = await request.get('/api/ops/health');
  expect(res.status()).toBe(200);
  const j = await res.json();
  expect(j.ok).toBeTruthy();
  expect(j.service).toBe('web');
  expect(typeof j.version).toBe('string');
  expect(typeof j.commit).toBe('string');
});

test('Member redirect canonicalizes', async ({ page }) => {
  const res = await page.goto('/Member', { waitUntil: 'domcontentloaded' });
  expect(res?.status()).toBeGreaterThanOrEqual(300);
  await expect(page).toHaveURL(/\/member$/);
});
