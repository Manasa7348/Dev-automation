import { APIRequestContext } from '@playwright/test';
import { ApiClient } from '../apiClient';

export class FamilyLeavePolicyAPI extends ApiClient {
  constructor(request: APIRequestContext, token: string) {
    super(request, token);
  }

  // ─────────────────────────────────────────
  // FAMILY LEAVE POLICY CRUD
  // ─────────────────────────────────────────

  getAll(token: string) {
    return this.request.get('/v1/community/family-leave-policy', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getById(flpId: string, token: string) {
    return this.request.get(`/v1/community/family-leave-policy/${flpId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getByType(typeId: number, token: string) {
    return this.request.get(`/v1/community/family-leave-policy/type/${typeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addFamilyLeavePolicy(payload: any, token: string) {
    return this.request.post('/v1/community/family-leave-policy', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateFamilyLeavePolicy(flpId: string, payload: any, token: string) {
    return this.request.put(`/v1/community/family-leave-policy/${flpId}`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deleteFamilyLeavePolicy(flpId: string, token: string) {
    return this.request.delete(`/v1/community/family-leave-policy/${flpId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // ARCHIVE / UNARCHIVE
  // ─────────────────────────────────────────

  archiveFamilyLeavePolicy(flpId: string, token: string) {
    return this.request.patch(`/v1/community/family-leave-policy/${flpId}/archive`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  unarchiveFamilyLeavePolicy(flpId: string, token: string) {
    return this.request.patch(`/v1/community/family-leave-policy/${flpId}/unarchive`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // TEMPLATE & EXPORT
  // ─────────────────────────────────────────

  downloadTemplate(token: string) {
    return this.request.get('/v1/community/family-leave-policy/template', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  exportFamilyLeavePolicy(flpId: string, token: string) {
    return this.request.get(`/v1/community/family-leave-policy/${flpId}/export`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // LOGO
  // ─────────────────────────────────────────

  async uploadLogo(flpId: string, filePath: string) {
    return this.postFormData(
      `/v1/community/family-leave-policy/${flpId}/logo`,
      filePath,
      'file'
    );
  }

  getLogo(flpId: string) {
    return this.request.get(`/v1/community/family-leave-policy/${flpId}/logo`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }
}