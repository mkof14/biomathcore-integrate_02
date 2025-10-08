import { test, expect } from '@playwright/test';

test('@smoke opens home', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Biomath/i);
});
