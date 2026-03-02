import { APIRequestContext } from '@playwright/test';

export class ScreensAPI {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getScreens(version: string, sectorId: string, token: string) {
    return this.request.get(`/v${version}/Screens?sectorId=${sectorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getScreenById(version: string, screenId: string, token: string) {
    return this.request.get(`/v${version}/Screens/${screenId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getHelpText(version: string, screenNo: number, token: string) {
    return this.request.get(
      `/v${version}/Screens/HelpText?screenNo=${screenNo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}