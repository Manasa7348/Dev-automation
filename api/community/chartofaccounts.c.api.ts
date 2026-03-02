import { APIRequestContext } from '@playwright/test';
import * as fs from 'fs';
import path from 'path';

export class ChartOfAccountsAPI {
  constructor(private request: APIRequestContext) {}

  // ─────────────────────────────────────────
  // CHART OF ACCOUNTS CRUD
  // ─────────────────────────────────────────

  getAll(token: string) {
    return this.request.get('/v1/community/chart-of-accounts', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addChartOfAccount(payload: any[], token: string) {
    return this.request.post('/v1/community/chart-of-accounts', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateChartOfAccount(payload: any, token: string) {
    return this.request.put('/v1/community/chart-of-accounts', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deleteChartOfAccount(id: string, token: string) {
    return this.request.delete(`/v1/community/chart-of-accounts/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // ARCHIVE / UNARCHIVE
  // ─────────────────────────────────────────

  archiveChartOfAccount(id: string, token: string) {
    return this.request.patch('/v1/community/chart-of-accounts', {
      params: { id },
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  unarchiveChartOfAccount(id: string, token: string) {
    return this.request.patch('/v1/community/chart-of-accounts/unarchieve', {
      params: { id },
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getArchived(token: string) {
    return this.request.get('/v1/community/chart-of-accounts/archieved', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // TEMPLATE & LOGO
  // ─────────────────────────────────────────

  downloadTemplate(token: string) {
    return this.request.get('/v1/community/chart-of-accounts/template', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // POST Upload Logo
async uploadLogo(id: string, filePath: string, token: string) {
  const buffer = fs.readFileSync(filePath);

  return this.request.post(
    `/v1/community/chart-of-accounts/${id}/logo`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      multipart: {
        file: {
          name: path.basename(filePath),
          mimeType: 'image/jpeg',
          buffer: buffer
        }
      }
    }
  );
}

  // GET Logo
  getLogo(id: string, token: string) {
    return this.request.get(`/v1/community/chart-of-accounts/${id}/logo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // ─────────────────────────────────────────
  // CHART OF ACCOUNTS DETAILS
  // ─────────────────────────────────────────

  // GET all details for a chart of account
  getDetails(caId: string, token: string) {
    return this.request.get(`/v1/community/chart-of-accounts/${caId}/details`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // GET details by ciNo (seqNo)
  getDetailsByNo(caId: string, ciNo: number, token: string) {
    return this.request.get(
      `/v1/community/chart-of-accounts/${caId}/details/CommChartOfAccountsItemByNo/${ciNo}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }

  // GET export details
  exportDetails(caId: string, token: string) {
    return this.request.get(`/v1/community/chart-of-accounts/${caId}/details/export`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  // ─────────────────────────────────────────
// CHART OF ACCOUNTS DETAILS (CRUD)
// ─────────────────────────────────────────

// POST add details (items)
addDetails(caId: string, payload: any[], token: string) {
  return this.request.post(`/v1/community/chart-of-accounts/${caId}/details`, {
    data: payload,
    headers: { Authorization: `Bearer ${token}` }
  });
}
}