import { test, expect } from '@playwright/test';

test('@smoke blackbox create + get + cancel + clear', async ({ request, baseURL }) => {
  // create
  const create = await request.post(`${baseURL}/api/blackbox/jobs`, {
    data: { kind: 'demo', payload: { a: 1 } },
  });
  expect(create.ok()).toBeTruthy();
  const cj = await create.json();
  const id = cj?.job?.id;
  expect(typeof id).toBe('string');

  // get
  const get = await request.get(`${baseURL}/api/blackbox/jobs/${id}`);
  expect(get.ok()).toBeTruthy();
  const gj = await get.json();
  expect(gj?.ok).toBe(true);

  // cancel
  const cancel = await request.post(`${baseURL}/api/blackbox/jobs/${id}/cancel`);
  expect(cancel.ok()).toBeTruthy();
  const kj = await cancel.json();
  expect(kj?.ok).toBe(true);

  // clear (best-effort)
  const clear = await request.post(`${baseURL}/api/blackbox/jobs/clear`, { data: { before: new Date().toISOString() } });
  expect(clear.ok()).toBeTruthy();
});
