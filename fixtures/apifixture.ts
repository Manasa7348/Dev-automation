import { test as base } from '@playwright/test';
import { AuthAPI } from '../api/auth.api';

type MyFixtures = {
  token: string;
   employerId: string;
};

export const test = base.extend<MyFixtures>({
  token: async ({ request }, use) => {
    const auth = new AuthAPI(request);

    const version = '1';
    const email = 'manasa.s@tenzingtechnologies.com';
    const password = '9Wu8*)3YaOlm';

    const response = await auth.login(version, email, password);
    const text = await response.text();

    if (response.status() !== 200) {
      console.error('Login failed:', text);
      throw new Error(`Login failed with status ${response.status()}`);
    }

    const body = JSON.parse(text);
   
    const token = body.result?.accessToken;

    if (!token) {
      console.error('Login Response:', JSON.stringify(body, null, 2));
      throw new Error('Auth token not found in login response');
    }

    await use(token);
  },
   employerId: async ({}, use) => {
    await use('00000000-0000-0000-0000-000000000000');
  }
});

export { expect } from '@playwright/test';