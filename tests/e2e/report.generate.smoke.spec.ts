import { test, expect } from '@playwright/test';

test('@smoke report create + fetch', async ({ request, baseURL }) => {
  const create = await request.post(`${baseURL}/api/reports/generate`, {
    data: { userId: 'u-smoke', title: 'Smoke Report' },
  });
  expect(create.ok()).toBeTruthy();
  const { id, ok } = await create.json();
  expect(ok).toBe(true);
  expect(typeof id).toBe('string');

  const read = await request.get(`${baseURL}/api/reports/${id}`);
  expect(read.ok()).toBeTruthy();
  const j = await read.json();

  expect(j?.ok).toBe(true);
  expect(j?.report?.title).toBe('Smoke Report');
});
