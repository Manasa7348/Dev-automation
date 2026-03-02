import { APIRequestContext } from '@playwright/test';
import { ApiClient } from '../apiClient'
import * as fs from 'fs';
import * as path from 'path';

export class GradesAPI extends ApiClient {
  constructor(request: APIRequestContext, token: string) {
    super(request, token)
  }

  // ─────────────────────────────────────────
  // GRADES CRUD
  // ─────────────────────────────────────────

  getAll(token: string) {
    return this.request.get('/v1/community/grades', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getById(gradeId: string, token: string) {
    return this.request.get(`/v1/community/grades/${gradeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addGrade(payload: any[], token: string) {
    return this.request.post('/v1/community/grades', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

updateGrade(gradeId: string, payload: any, token: string) {
    return this.request.put(`/v1/community/grades/${gradeId}`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deleteGrade(gradeId: string, token: string) {
    return this.request.delete(`/v1/community/grades/${gradeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // ARCHIVE / UNARCHIVE
  // ─────────────────────────────────────────

  archiveGrade(gradeId: string, token: string) {
    return this.request.patch(`/v1/community/grades/${gradeId}/archive`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  unarchiveGrade(gradeId: string, token: string) {
    return this.request.patch(`/v1/community/grades/${gradeId}/unarchive`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getArchived(token: string) {
    return this.request.get('/v1/community/grades/archived', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // TEMPLATE & EXPORT
  // ─────────────────────────────────────────

  downloadTemplate(token: string) {
    return this.request.get('/v1/community/grades/template', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  exportGrade(gradeId: string, token: string) {
    return this.request.get(`/v1/community/grades/${gradeId}/export`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // GRADE DETAILS
  // ─────────────────────────────────────────

 addDetails(gradeId: string, payload: any[], token: string) {
  return this.request.post(`/v1/community/${gradeId}/details`, {
    data: payload,
    headers: { Authorization: `Bearer ${token}` }
  });
}

getDetails(gradeId: string, token: string) {
  return this.request.get(`/v1/community/${gradeId}/details`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

getDetailsByName(gradeId: string, ptName: string, token: string) {
  return this.request.get(`/v1/community/${gradeId}/details/${ptName}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

exportDetails(gradeId: string, token: string) {
  return this.request.get(`/v1/community/${gradeId}/details/export`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

  // ─────────────────────────────────────────
  // GRADE LOGO
  // ─────────────────────────────────────────

  async uploadLogo(id: string, filePath: string) {
    return this.postFormData(
      `/v1/community/grades/${id}/logo`,
      filePath,
      'file'
    )
  }

  async getLogo(id: string) {
    return this.request.get(`/v1/community/grades/${id}/logo`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }
}