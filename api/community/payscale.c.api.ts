import { APIRequestContext } from '@playwright/test';
import { ApiClient } from '../apiClient'
import { BaseAPI } from '../base.api'
import * as fs from 'fs';
import * as path from 'path';

export class PayScalesAPI extends ApiClient{
 constructor(request: APIRequestContext, token: string) {
  super(request, token)
}

  // ─────────────────────────────────────────
  // PAY SCALE CRUD
  // ─────────────────────────────────────────

  getAll(token: string) {
    return this.request.get('/v1/community/payscales', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getById(payscaleId: string, token: string) {
    return this.request.get(`/v1/community/payscales/${payscaleId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addPayScale(payload: any[], token: string) {
    return this.request.post('/v1/community/payscales', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updatePayScale(payload: any, token: string) {
    return this.request.put('/v1/community/payscales', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deletePayScale(payscaleId: string, token: string) {
    return this.request.delete(`/v1/community/payscales/${payscaleId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // ARCHIVE / UNARCHIVE
  // ─────────────────────────────────────────

  archivePayScale(payscaleId: string, token: string) {
    return this.request.patch(`/v1/community/payscales/${payscaleId}/archive`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  unarchivePayScale(payscaleId: string, token: string) {
    return this.request.patch(`/v1/community/payscales/${payscaleId}/unarchive`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getArchived(token: string) {
    return this.request.get('/v1/community/payscales/archived', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // TEMPLATE & EXPORT
  // ─────────────────────────────────────────

  downloadTemplate(token: string) {
    return this.request.get('/v1/community/payscales/template', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  exportPayScale(payscaleId: string, token: string) {
    return this.request.get(`/v1/community/payscales/${payscaleId}/export`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // PAY SCALE DETAILS
  // ─────────────────────────────────────────

  getDetails(payscaleId: string, token: string) {
    return this.request.get(`/v1/community/payscale/${payscaleId}/details`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getDetailsByName(payscaleId: string, ptName: string, token: string) {
    return this.request.get(`/v1/community/payscale/${payscaleId}/details/${ptName}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addDetails(payscaleId: string, payload: any[], token: string) {
    return this.request.post(`/v1/community/payscale/${payscaleId}/details`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  exportDetails(payscaleId: string, token: string) {
    return this.request.get(`/v1/community/payscale/${payscaleId}/details/export`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // PAY SCALE LOGO
  // ─────────────────────────────────────────
async uploadLogo(id: string, filePath: string) {
  return this.postFormData(
    `/v1/community/payscales/${id}/logo`,
    filePath,
    'file'
  )
}

// GET Logo
async getLogo(id: string) {
  return this.request.get(`/v1/community/payscales/${id}/logo`, {
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  })
} }