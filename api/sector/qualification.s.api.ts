import { APIRequestContext } from '@playwright/test';

export class QualificationAPI {
  private request: APIRequestContext;
  private baseUrl = `/v1/employers/00000000-0000-0000-0000-000000000000/qualifications`;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getAll(token: string) {
    return this.request.get(this.baseUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  async getById(id: string, token: string) {
    return this.request.get(`${this.baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  async addQualification(data: any, token: string) {
    return this.request.post(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data
    });
  }

  async updateQualification(data: any, token: string) {
    return this.request.put(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data
    });
  }

  async deleteQualification(id: string, token: string) {
    return this.request.delete(`${this.baseUrl}?id=${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}