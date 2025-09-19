import { describe, it, expect } from "vitest";
import { generateReport } from "@/lib/report-engine/geminiGenerate";

describe("generateReport (mock mode)", () => {
  it("returns deterministic mock", async () => {
    process.env.REPORTS_MOCK = "1";
    const res = await generateReport({ userId: "u1", title: "Demo", params: { a: 1 } });
    expect(res.title).toBe("Demo");
    expect(Array.isArray(res.lines)).toBe(true);
    expect(res.meta?.mock).toBe(true);
  });
});
