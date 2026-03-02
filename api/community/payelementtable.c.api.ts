import { APIRequestContext } from '@playwright/test';
import { ApiClient } from '../apiClient';

export class PayElementTableAPI extends ApiClient {
  constructor(request: APIRequestContext, token: string) {
    super(request, token);
  }

  // ─────────────────────────────────────────
  // PAY ELEMENT TABLE CRUD
  // ─────────────────────────────────────────

  getAll(token: string) {
    return this.request.get('/v1/community/pay-element-tables', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addPayElementTable(payload: any[], token: string) {
    return this.request.post('/v1/community/pay-element-tables', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updatePayElementTable(petId: string, payload: any, token: string) {
    return this.request.put(`/v1/community/pay-element-tables/${petId}`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deletePayElementTable(petId: string, token: string) {
    return this.request.delete(`/v1/community/pay-element-tables/${petId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // ARCHIVE / UNARCHIVE
  // ─────────────────────────────────────────

  archivePayElementTable(petId: string, token: string) {
    return this.request.patch(`/v1/community/pay-element-tables/${petId}/archive`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  unarchivePayElementTable(petId: string, token: string) {
    return this.request.patch(`/v1/community/pay-element-tables/${petId}/unarchive`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // ITEMS
  // ─────────────────────────────────────────

  getItems(petId: string, token: string) {
    return this.request.get(`/v1/community/pay-element-tables/${petId}/items`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateItems(petId: string, payload: any[], token: string) {
    return this.request.put(`/v1/community/pay-element-tables/${petId}/items`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // TEMPLATE & EXPORT
  // ─────────────────────────────────────────

  downloadTemplate(typeId: number, token: string) {
    return this.request.get(`/v1/community/pay-element-tables/template/${typeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  exportPayElementTable(petId: string, token: string) {
    return this.request.get(`/v1/community/pay-element-tables/${petId}/export`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // LOGO
  // ─────────────────────────────────────────

  async uploadLogo(petId: string, filePath: string) {
    return this.postFormData(
      `/v1/community/pay-element-tables/${petId}/logo`,
      filePath,
      'file'
    );
  }

  getLogo(petId: string) {
    return this.request.get(`/v1/community/pay-element-tables/${petId}/logo`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }
}