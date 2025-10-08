import base from './playwright.config';
import type { PlaywrightTestConfig } from '@playwright/test';

const cfg: PlaywrightTestConfig = {
  ...base,
  grep: /@smoke/,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
};
export default cfg;
