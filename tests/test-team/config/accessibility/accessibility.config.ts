import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';
import baseConfig from '@config/playwright.config';

export default defineConfig({
  ...baseConfig,
  fullyParallel: true,
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  projects: [
    {
      name: 'accessibility',
      testMatch: '*.accessibility.spec.ts',
      use: {
        screenshot: 'only-on-failure',
        baseURL: 'http://localhost:3000',
        ...devices['Desktop Chrome'],
        headless: true,
      },
    },
  ],
  reporter: [
    ['line'],
    [
      'html',
      {
        outputFolder: path.resolve(
          __dirname,
          '../../playwright-report-accessibility'
        ),
        open: process.env.CI ? 'never' : 'on-failure',
      },
    ],
  ],
  /* Run your local dev server before starting the tests */
  webServer: {
    timeout: 4 * 60 * 1000, // 4 minutes
    command: 'npm run build && npm run start',
    cwd: path.resolve(__dirname, '../../../..'),
    url: 'http://localhost:3000/auth',
    reuseExistingServer: !process.env.CI,
    stderr: 'pipe',
  },
});
