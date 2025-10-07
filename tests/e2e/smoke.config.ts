import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: ['tests/e2e/*.smoke.spec.ts'],
  reporter: [['list'], ['html', { outputFolder: 'tests/e2e/playwright-report', open: 'never' }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: "node tests/e2e/scripts/smoke-server.mjs",
    url: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 300000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
