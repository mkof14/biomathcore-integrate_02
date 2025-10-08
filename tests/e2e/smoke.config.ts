import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: ".",
  workers: 1,
  use: { baseURL: "http://127.0.0.1:3010" },
  webServer: {
    command: "PORT=3010 HOST=127.0.0.1 node ../../scripts/start-smoke-server.js",
    url: "http://127.0.0.1:3010",
    reuseExistingServer: true,
    stdout: "pipe",
    stderr: "pipe",
    timeout: 300000,
  },
});
