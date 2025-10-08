import { test, expect } from "@playwright/test";
test("@smoke health ok", async ({ request }) => {
  const r = await request.get("/api/health");
  expect(r.ok()).toBeTruthy();
  const j = await r.json();
  expect(j.ok).toBe(true);
});
test("@smoke root ok", async ({ request }) => {
  const r = await request.get("/");
  expect(r.ok()).toBeTruthy();
});
