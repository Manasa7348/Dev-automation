import { APIRequestContext } from '@playwright/test';
import { ApiClient } from '../apiClient';

export class PayBandAPI extends ApiClient {
  constructor(request: APIRequestContext, token: string) {
    super(request, token);
  }

  // ─────────────────────────────────────────
  // PAY BAND CRUD
  // ─────────────────────────────────────────

  getAll(token: string) {
    return this.request.get('/v1/community/paybands', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getById(pbId: string, token: string) {
    return this.request.get(`/v1/community/paybands/${pbId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addPayBand(payload: any[], token: string) {
    return this.request.post('/v1/community/paybands', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updatePayBand(pbId: string, payload: any, token: string) {
    return this.request.put(`/v1/community/paybands/${pbId}`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deletePayBand(pbId: string, token: string) {
    return this.request.delete(`/v1/community/paybands/${pbId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // ARCHIVE / UNARCHIVE
  // ─────────────────────────────────────────

  archivePayBand(pbId: string, token: string) {
    return this.request.patch(`/v1/community/paybands/${pbId}/archive`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  unarchivePayBand(pbId: string, token: string) {
    return this.request.patch(`/v1/community/paybands/${pbId}/unarchive`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // TEMPLATE & EXPORT
  // ─────────────────────────────────────────

  downloadTemplate(token: string) {
    return this.request.get('/v1/community/paybands/template', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  exportPayBand(pbId: string, token: string) {
    return this.request.get(`/v1/community/paybands/${pbId}/export`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // LOGO
  // ─────────────────────────────────────────

  async uploadLogo(pbId: string, filePath: string) {
    return this.postFormData(
      `/v1/community/paybands/${pbId}/logo`,
      filePath,
      'file'
    );
  }

  getLogo(pbId: string) {
    return this.request.get(`/v1/community/paybands/${pbId}/logo`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }
}