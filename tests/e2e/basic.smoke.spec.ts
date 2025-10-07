import { test, expect } from "@playwright/test";

test("@smoke health ok", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.ok()).toBeTruthy();
  const j = await res.json();
  expect(j.ok).toBe(true);
});

test("@smoke root ok", async ({ request }) => {
  const res = await request.get("/");
  expect(res.ok()).toBeTruthy();
});
