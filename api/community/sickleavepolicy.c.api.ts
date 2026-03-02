import { APIRequestContext } from '@playwright/test';
import { ApiClient } from '../apiClient';

export class SickLeavePolicyAPI extends ApiClient {
  constructor(request: APIRequestContext, token: string) {
    super(request, token);
  }

  // ─────────────────────────────────────────
  // SICK LEAVE POLICY CRUD
  // ─────────────────────────────────────────

  getAll(token: string) {
    return this.request.get('/v1/community/sick-leave-policy', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getById(slpId: string, token: string) {
    return this.request.get(`/v1/community/sick-leave-policy/${slpId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addSickLeavePolicy(payload: any, token: string) {
    return this.request.post('/v1/community/sick-leave-policy', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateSickLeavePolicy(slpId: string, payload: any, token: string) {
    return this.request.put(`/v1/community/sick-leave-policy/${slpId}`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deleteSickLeavePolicy(slpId: string, token: string) {
    return this.request.delete(`/v1/community/sick-leave-policy/${slpId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // ARCHIVE / UNARCHIVE
  // ─────────────────────────────────────────

  archiveSickLeavePolicy(slpId: string, token: string) {
    return this.request.patch(`/v1/community/sick-leave-policy/${slpId}/archive`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  unarchiveSickLeavePolicy(slpId: string, token: string) {
    return this.request.patch(`/v1/community/sick-leave-policy/${slpId}/unarchive`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // TEMPLATE & EXPORT
  // ─────────────────────────────────────────

  downloadTemplate(token: string) {
    return this.request.get('/v1/community/sick-leave-policy/template', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  exportSickLeavePolicy(slpId: string, token: string) {
    return this.request.get(`/v1/community/sick-leave-policy/${slpId}/export`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // LOGO
  // ─────────────────────────────────────────

  async uploadLogo(slpId: string, filePath: string) {
    return this.postFormData(
      `/v1/community/sick-leave-policy/${slpId}/logo`,
      filePath,
      'file'
    );
  }

  getLogo(slpId: string) {
    return this.request.get(`/v1/community/sick-leave-policy/${slpId}/logo`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }
}