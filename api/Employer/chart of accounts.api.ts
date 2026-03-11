import { APIRequestContext } from '@playwright/test';

export class EmployerCodesAPI {
  private request: APIRequestContext;
  private employerId = '9a694b9b-74aa-4917-81b4-ae47dfdb7fff';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // ─────────────────────────────────────────
  // LEDGER CODES
  // ─────────────────────────────────────────

  getLedgerCodes(token: string) {
    return this.request.get(`/v1/employers/${this.employerId}/ledgercodes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getLedgerCodeById(legId: string, token: string) {
    return this.request.get(`/v1/employers/${this.employerId}/ledgercodes/${legId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  downloadLedgerTemplate(token: string) {
    return this.request.get(`/v1/employers/${this.employerId}/ledgercodes/template`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  createLedgerCode(payload: any, token: string) {
    return this.request.post(`/v1/employers/${this.employerId}/ledgercodes`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateLedgerCode(payload: any, token: string) {
    return this.request.put(`/v1/employers/${this.employerId}/ledgercodes`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deleteLedgerCode(ids: string[], token: string) {
    return this.request.delete(`/v1/employers/${this.employerId}/ledgercodes`, {
      data: ids,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // COST CENTRE
  // ─────────────────────────────────────────

  getCostCentres(token: string) {
    return this.request.get(`/v1/employers/${this.employerId}/costcentre`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getCostCentreById(cosId: string, token: string) {
    return this.request.get(`/v1/employers/${this.employerId}/costcentre/${cosId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  createCostCentre(payload: any, token: string) {
    return this.request.post(`/v1/employers/${this.employerId}/costcentre`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateCostCentre(payload: any, token: string) {
    return this.request.put(`/v1/employers/${this.employerId}/costcentre`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deleteCostCentre(cosId: string, token: string) {
    return this.request.delete(`/v1/employers/${this.employerId}/costcentre`, {
      params: { costCentreId: cosId },
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // ─────────────────────────────────────────
  // FUND CODES
  // ─────────────────────────────────────────

  getFundCodes(token: string) {
    return this.request.get(`/v1/employers/${this.employerId}/fundcodes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getFundCodeById(funId: string, token: string) {
    return this.request.get(`/v1/employers/${this.employerId}/fundcodes/${funId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  createFundCode(payload: any, token: string) {
    return this.request.post(`/v1/employers/${this.employerId}/fundcodes`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateFundCode(payload: any, token: string) {
    return this.request.put(`/v1/employers/${this.employerId}/fundcodes`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deleteFundCode(ids: string[], token: string) {
    return this.request.delete(`/v1/employers/${this.employerId}/fundcodes`, {
      data: ids,
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}