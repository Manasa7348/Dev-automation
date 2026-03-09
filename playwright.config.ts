import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  timeout: 30 * 1000,

  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  globalSetup: './global-setup.ts',       
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