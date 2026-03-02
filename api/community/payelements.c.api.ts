import { APIRequestContext } from '@playwright/test';

export class PayElementAPI {
  constructor(private request: APIRequestContext) {}

  getAll(token: string) {
    return this.request.get('/v1/community/payelement', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getById(payElementId: string, token: string) {
    return this.request.get(`/v1/community/payelement/${payElementId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addPayElement(payload: any[], token: string) {
    return this.request.post('/v1/community/payelement', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updatePayElement(payElementId: string, payload: any, token: string) {
    return this.request.put(`/v1/community/payelement/${payElementId}`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deletePayElement(payElementId: string, token: string) {
    return this.request.delete(`/v1/community/payelement/${payElementId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  downloadTemplate(token: string) {
    return this.request.get('/v1/community/payelement/template', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
