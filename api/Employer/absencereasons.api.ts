export class AbsenceCategoriesAPI {
  private request: any;
  private base = `/v1/employers`;
  private employerId = '9a694b9b-74aa-4917-81b4-ae47dfdb7fff';

  constructor(request: any) {
    this.request = request;
  }

  // ─────────────────────────────────────────
  // ABSENCE CATEGORIES
  // ─────────────────────────────────────────

  getAll(token: string) {
    return this.request.get(`${this.base}/${this.employerId}/absence-catgories`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }

  getById(absCatgId: string, token: string) {
    return this.request.get(`${this.base}/${this.employerId}/absence-catgories/${absCatgId}`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }

  getTemplate(token: string) {
    return this.request.get(`${this.base}/${this.employerId}/absence-catgories/template`, {
      headers: { Authorization: `Bearer ${token}`, accept: '*/*' }
    });
  }

  create(data: any, token: string) {
    return this.request.post(`${this.base}/${this.employerId}/absence-catgories`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data
    });
  }

  update(absCatgId: string, data: any, token: string) {
    return this.request.put(`${this.base}/${this.employerId}/absence-catgories/${absCatgId}`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data
    });
  }

  delete(absCatgId: string, token: string) {
    return this.request.delete(`${this.base}/${this.employerId}/absence-catgories/${absCatgId}`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }

  // ─────────────────────────────────────────
  // ABSENCE REASONS
  // ─────────────────────────────────────────

  getReasons(absCatgId: string, token: string) {
    return this.request.get(`${this.base}/${this.employerId}/absence-catgories/${absCatgId}/reasons`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }

  getReasonById(absCatgId: string, reasonNo: number, token: string) {
    return this.request.get(`${this.base}/${this.employerId}/absence-catgories/${absCatgId}/reasons/${reasonNo}`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }

  createReason(absCatgId: string, data: any, token: string) {
    return this.request.post(`${this.base}/${this.employerId}/absence-catgories/${absCatgId}/reasons`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data
    });
  }

  updateReason(absCatgId: string, reasonNo: number, data: any, token: string) {
    return this.request.put(`${this.base}/${this.employerId}/absence-catgories/${absCatgId}/reasons/${reasonNo}`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data
    });
  }

  deleteReason(absCatgId: string, reasonNo: number, token: string) {
    return this.request.delete(`${this.base}/${this.employerId}/absence-catgories/${absCatgId}/reasons/${reasonNo}`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }
}