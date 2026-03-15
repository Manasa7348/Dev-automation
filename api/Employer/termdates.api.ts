export class TermDatesAPI {
  private request: any;
  private base = `/v1/employers`;
  private employerId = '9a694b9b-74aa-4917-81b4-ae47dfdb7fff';

  constructor(request: any) {
    this.request = request;
  }

  // ─────────────────────────────────────────
  // TERM DATE GROUP
  // ─────────────────────────────────────────

  getAllGroups(token: string) {
    return this.request.get(`${this.base}/${this.employerId}/termdategroup`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }

  getGroupById(tdGroupId: string, token: string) {
    return this.request.get(`${this.base}/${this.employerId}/termdategroup/${tdGroupId}`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }

  createGroup(data: any, token: string) {
    return this.request.post(`${this.base}/${this.employerId}/termdategroup`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data
    });
  }

  updateGroup(tdGroupId: string, data: any, token: string) {
    return this.request.put(`${this.base}/${this.employerId}/termdategroup/${tdGroupId}`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data
    });
  }

  deleteGroup(tdGroupId: string, token: string) {
    return this.request.delete(`${this.base}/${this.employerId}/termdategroup/${tdGroupId}`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }

  // ─────────────────────────────────────────
  // TERM DATES
  // ─────────────────────────────────────────

  getAllDates(tdGroupId: string, token: string) {
    return this.request.get(`/v1/termdategroup/${tdGroupId}/termdate`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }

  getDateById(tdGroupId: string, tdId: string, token: string) {
    return this.request.get(`/v1/termdategroup/${tdGroupId}/termdate/${tdId}`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }

  createDate(tdGroupId: string, data: any, token: string) {
    return this.request.post(`/v1/termdategroup/${tdGroupId}/termdate`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      params: { employerId: this.employerId },
      data
    });
  }

  updateDate(tdGroupId: string, tdId: string, data: any, token: string) {
    return this.request.put(`/v1/termdategroup/${tdGroupId}/termdate/${tdId}`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data
    });
  }

  deleteDate(tdGroupId: string, tdId: string, token: string) {
    return this.request.delete(`/v1/termdategroup/${tdGroupId}/termdate/${tdId}`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' },
      params: { employerId: this.employerId }
    });
  }
}