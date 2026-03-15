import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
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
      testMatch: [
        'tests/community/**/*.spec.ts',
        'tests/home/**/*.spec.ts',
        'tests/sector/**/*.spec.ts',
        'tests/Employer/index.spec.ts',
      ]
    },
  ],
});