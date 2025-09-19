import { test, expect } from "@playwright/test";

test("@smoke api health responds", async ({ request, baseURL }) => {
  const r = await request.get(`${baseURL}/api/health`);
  expect(r.ok()).toBeTruthy();
  const j = await r.json();
  expect(j.ok).toBe(true);
});
