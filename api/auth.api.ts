import { APIRequestContext } from '@playwright/test';

export class AuthAPI {
  constructor(private request: APIRequestContext) {}

  async login(version: string, email: string, password: string) {
    return this.request.post(`/v${version}/account/login`, {
      data: { email, password }
    });
  }
}
