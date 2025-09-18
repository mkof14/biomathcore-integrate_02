import { test, expect } from "@playwright/test";

test("@smoke env variables are loaded", async () => {
  const required = ["DATABASE_URL", "NEXTAUTH_SECRET"];
  for (const key of required) {
    expect(process.env[key], `${key} should be defined`).toBeTruthy();
  }
});
