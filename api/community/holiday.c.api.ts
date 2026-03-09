import { APIRequestContext } from '@playwright/test';
import { ApiClient } from '../apiClient';

export class TermTimeOnlyAPI extends ApiClient {
  constructor(request: APIRequestContext, token: string) {
    super(request, token);
  }

  // ─────────────────────────────────────────
  // TERM TIME ONLY CRUD
  // ─────────────────────────────────────────

  getAll(token: string) {
    return this.request.get('/v1/community/term-time-only', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getById(ttId: string, token: string) {
    return this.request.get(`/v1/community/term-time-only/${ttId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  create(payload: any, token: string) {
    return this.request.post('/v1/community/term-time-only', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  update(ttId: string, payload: any, token: string) {
    return this.request.put(`/v1/community/term-time-only/${ttId}`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  delete(ttId: string, token: string) {
    return this.request.delete(`/v1/community/term-time-only/${ttId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // ARCHIVE / UNARCHIVE
  // ─────────────────────────────────────────

  archiveTermTime(ttId: string, token: string) {
    return this.request.patch(`/v1/community/term-time-only/${ttId}/archive`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  unarchiveTermTime(ttId: string, token: string) {
    return this.request.patch(`/v1/community/term-time-only/${ttId}/unarchive`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // DETAILS & CARDS
  // ─────────────────────────────────────────

  getDetails(ttId: string, token: string) {
    return this.request.get(`/v1/community/term-time-only/${ttId}/details`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getCards(token: string) {
    return this.request.get('/v1/community/term-time-only/cards', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // LOGO
  // ─────────────────────────────────────────

  async uploadLogo(ttId: string, filePath: string) {
    return this.postFormData(
      `/v1/community/term-time-only/${ttId}/logo`,
      filePath,
      'file'
    );
  }

  getLogo(ttId: string, token: string) {
    return this.request.get(`/v1/community/term-time-only/${ttId}/logo`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }


getTemplate(token: string) {
  return this.request.get('/v1/community/term-time-only/template', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

exportTermTime(termTimeId: string, token: string) {
  return this.request.get(`/v1/community/term-time-only/${termTimeId}/export`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
}