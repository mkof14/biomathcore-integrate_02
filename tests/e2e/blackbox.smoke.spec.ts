import { test, expect } from "@playwright/test";
test("@smoke blackbox create + get + cancel + clear", async ({ request, baseURL }) => {
  const create = await request.post(`${baseURL}/api/blackbox/jobs`, { data: { kind: "demo", payload: { a: 1 } } });
  expect(create.ok()).toBeTruthy();
  const cj = await create.json();
  const id = cj?.job?.id as string;
  expect(id).toBeTruthy();

  const get = await request.get(`${baseURL}/api/blackbox/jobs/${id}`);
  expect(get.ok()).toBeTruthy();

  const cancel = await request.post(`${baseURL}/api/blackbox/jobs/${id}/cancel`);
  expect(cancel.ok()).toBeTruthy();

  const clear = await request.post(`${baseURL}/api/blackbox/jobs/clear`, { data: { before: new Date().toISOString() } });
  expect(clear.ok()).toBeTruthy();
});
