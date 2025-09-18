import { test, expect } from '@playwright/test';
test('@smoke api health responds', async ({ request, baseURL }) => {
  const url = `${baseURL}/api/status`;
  const r = await request.get(url);
  expect(r.ok()).toBeTruthy();
  const j = await r.json();
  expect(j).toHaveProperty('ok');
});
