import { APIRequestContext } from '@playwright/test';
import { ApiClient } from '../apiClient';

export class TermDateSetAPI extends ApiClient {
  constructor(request: APIRequestContext, token: string) {
    super(request, token);
  }

  // ─────────────────────────────────────────
  // TERM DATE SET CRUD
  // ─────────────────────────────────────────

  getAll(token: string) {
    return this.request.get('/v1/community/termdatesets', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getById(tgId: string, token: string) {
    return this.request.get(`/v1/community/termdatesets/${tgId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addTermDateSet(payload: any[], token: string) {
    return this.request.post('/v1/community/termdatesets', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateTermDateSet(tgId: string, payload: any, token: string) {
    return this.request.put(`/v1/community/termdatesets/${tgId}`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deleteTermDateSet(tgId: string, token: string) {
    return this.request.delete(`/v1/community/termdatesets/${tgId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // ARCHIVE / UNARCHIVE
  // ─────────────────────────────────────────

  archiveTermDateSet(tgId: string, token: string) {
    return this.request.patch(`/v1/community/termdatesets/${tgId}/archive`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  unarchiveTermDateSet(tgId: string, token: string) {
    return this.request.patch(`/v1/community/termdatesets/${tgId}/unarchive`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getArchived(token: string) {
    return this.request.get('/v1/community/termdatesets/archived', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // TEMPLATE
  // ─────────────────────────────────────────

  downloadTemplate(token: string) {
    return this.request.get('/v1/community/termdatesets/template', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // LOGO
  // ─────────────────────────────────────────

  async uploadLogo(tgId: string, filePath: string) {
    return this.postFormData(
      `/v1/community/termdatesets/${tgId}/logo`,
      filePath,
      'file'
    );
  }

  getLogo(tgId: string) {
    return this.request.get(`/v1/community/termdatesets/${tgId}/logo`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }

  // ─────────────────────────────────────────
  // TERM DATE ENTRIES (CommTermDate)
  // ─────────────────────────────────────────

  getTermDates(tgId: string, token: string) {
    return this.request.get(`/v1/CommTermDate?Id=${tgId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addTermDates(tgId: string, payload: any[], token: string) {
    return this.request.post(`/v1/CommTermDate?Id=${tgId}`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  exportTermDates(tgId: string, token: string) {
    return this.request.get(`/v1/CommTermDate/${tgId}/export`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}