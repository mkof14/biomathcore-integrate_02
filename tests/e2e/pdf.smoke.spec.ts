import { test, expect } from "@playwright/test";
test("@smoke report pdf generate", async ({ request }) => {
  const payload = {
    plan: "core",
    reportId: "pdf_smoke_001",
    generatedAt: new Date().toISOString(),
    templateVersion: "v1",
    summary: "PDF smoke",
    sections: [{ id: "ov", title: "Overview", metrics: [{ key: "bmi", label: "BMI", value: 23.7 }] }],
  };
  const res = await request.post("/api/reports/pdf", { data: payload });
  expect(res.ok()).toBeTruthy();
  const ct = res.headers()["content-type"];
  expect(ct).toContain("application/pdf");
});
