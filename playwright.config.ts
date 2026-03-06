import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  timeout: 30 * 1000,
  retries: 1,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  globalTeardown: './global-teardown.ts',
  use: {
    baseURL: 'https://apidev.tenzingtechnologies.com',
  },
  projects: [
    {
      name: 'api',
    },
  ],
});