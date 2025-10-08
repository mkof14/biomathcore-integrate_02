import { test, expect } from "@playwright/test";
test("@smoke report pdf generate", async ({ request }) => {
  const payload = { title: "Smoke PDF", sections: [{ id: "ov", title: "Overview" }] };
  const res = await request.post("/api/reports/pdf", { data: payload });
  expect(res.ok()).toBeTruthy();
  const ct = res.headers()["content-type"];
  expect(ct).toContain("application/pdf");
});
