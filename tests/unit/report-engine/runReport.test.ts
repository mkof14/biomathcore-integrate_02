import { describe, it, expect } from "vitest";
import { runReport } from "@/lib/report-engine";
import { generateReport } from "@/lib/report-engine/generate";

describe("runReport", () => {
  it("validates input and output", async () => {
    const input = { userId: "u1", title: "Demo", params: { a: 1 } };
    const out = await runReport(input, generateReport);
    expect(out.title).toBe("Demo");
    expect(Array.isArray(out.lines)).toBe(true);
  });

  it("throws on invalid input", async () => {
    // @ts-expect-error invalid
    await expect(runReport({ userId: "", title: "" }, generateReport)).rejects.toThrow();
  });
});
