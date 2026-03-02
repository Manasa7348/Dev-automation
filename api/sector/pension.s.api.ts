import { APIRequestContext } from '@playwright/test';
import { ApiClient } from '../apiClient';

export class PensionAPI extends ApiClient {
  constructor(request: APIRequestContext, token: string) {
    super(request, token);
  }

  // ─────────────────────────────────────────
  // PENSION FUND CRUD
  // ─────────────────────────────────────────

  getAll(token: string) {
    return this.request.get('/v1/pension', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getById(fundId: string, token: string) {
    return this.request.get(`/v1/pension/${fundId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addPension(payload: any, token: string) {
    return this.request.post('/v1/pension', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updatePension(pfId: string, payload: any, token: string) {
    return this.request.put('/v1/pension', {
      data: payload,
      params: { pfId },
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deletePension(fundId: string, token: string) {
    return this.request.delete(`/v1/pension/${fundId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // RATE TABLE CRUD
  // ─────────────────────────────────────────

  getAllRateTables(token: string) {
    return this.request.get('/v1/pension/rate-tables', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getRateTableById(rtId: string, token: string) {
    return this.request.get(`/v1/pension/rate-tables/${rtId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getRateTableLookup(token: string) {
    return this.request.get('/v1/pension/rate-tables/lookup', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getRateTableBands(rtId: string, date: string, token: string) {
    return this.request.get(`/v1/pension/rate-tables/${rtId}/bands`, {
      params: { date },
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addRateTable(payload: any, token: string) {
    return this.request.post('/v1/pension/rate-tables', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addRateTableDate(rtId: string, payload: any, token: string) {
    return this.request.put('/v1/pension/rate-tables', {
      data: payload,
      params: { rtId },
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  renameRateTable(rtId: string, rateTableName: string, token: string) {
    return this.request.put(`/v1/pension/rate-tables/${rtId}`, {
      params: { rateTableName },
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deleteRateTable(rtId: string, token: string) {
    return this.request.delete(`/v1/pension/rate-tables/${rtId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deleteRateTableDate(rtId: string, date: string, token: string) {
    return this.request.delete(`/v1/pension/rate-tables/${rtId}/dates`, {
      params: { date },
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // ADDITIONAL CONTRIBUTIONS CRUD
  // ─────────────────────────────────────────

  getAllAdditionalContributions(token: string) {
    return this.request.get('/v1/pension/additional-contributions', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getAdditionalContributionById(acId: string, token: string) {
    return this.request.get(`/v1/pension/additional-contributions/${acId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addAdditionalContribution(payload: any, token: string) {
    return this.request.post('/v1/pension/additional-contributions', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateAdditionalContribution(acId: string, payload: any, token: string) {
    return this.request.put(`/v1/pension/additional-contributions/${acId}`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deleteAdditionalContribution(acId: string, token: string) {
    return this.request.delete(`/v1/pension/additional-contributions/${acId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}