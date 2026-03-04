import { APIRequestContext } from '@playwright/test';

export class NewsAlertAPI {
  constructor(private request: APIRequestContext) {}

  private base = (version: string) => `/v${version}/news-alert`;

  async getAll(version: string, token: string) {
    return this.request.get(this.base(version), {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  async getById(version: string, newsNo: number, token: string) {
    return this.request.get(`${this.base(version)}/${newsNo}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  async create(version: string, payload: any, token: string) {
    return this.request.post(this.base(version), {
      headers: { Authorization: `Bearer ${token}` },
      data: payload
    });
  }

  async update(version: string, payload: any, token: string) {
    return this.request.put(this.base(version), {
      headers: { Authorization: `Bearer ${token}` },
      data: payload
    });
  }

  async delete(version: string, newsNo: number, token: string) {
    return this.request.delete(`${this.base(version)}?newsNo=${newsNo}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  async archive(version: string, newsNo: number, archive: boolean, token: string) {
    return this.request.patch(
      `${this.base(version)}/${newsNo}/archive?archive=${archive}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  async unarchive(version: string, newsNo: number, archive: boolean, token: string) {
    return this.request.patch(
      `${this.base(version)}/${newsNo}/unarchive?archive=${archive}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
}