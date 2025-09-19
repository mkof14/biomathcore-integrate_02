import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
    reporters: ["default"],
    coverage: {
      reporter: ["text", "lcov"],
      include: ["src/lib/report-engine/**"],
      thresholds: { lines: 70, functions: 70, statements: 70, branches: 60 }
    }
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") }
  }
});
