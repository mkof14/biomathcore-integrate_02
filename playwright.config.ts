import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.e2e.ts'],
  testIgnore: ['**/unit/**', '**/integration/**'],
  timeout: 30_000,
  retries: 1,
  use: { baseURL: 'http://localhost:3000' },
  webServer: {
    command: 'NEXT_DISABLE_ESLINT=1 next dev -p 3000',
    port: 3000,
    reuseExistingServer: true,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
