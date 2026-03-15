export class ContactsAPI {
  private request: any;
  private base = `/v1/employers`;
  private employerId = '9a694b9b-74aa-4917-81b4-ae47dfdb7fff';

  constructor(request: any) {
    this.request = request;
  }

  getAll(token: string) {
    return this.request.get(`${this.base}/${this.employerId}/contacts`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }

  getById(contactId: string, token: string) {
    return this.request.get(`${this.base}/${this.employerId}/contacts/${contactId}`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }

  create(data: any, token: string) {
    return this.request.post(`${this.base}/${this.employerId}/contacts`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data
    });
  }

  update(contactId: string, data: any, token: string) {
    return this.request.put(`${this.base}/${this.employerId}/contacts/${contactId}`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data
    });
  }

  delete(ids: string[], token: string) {
    return this.request.delete(`${this.base}/${this.employerId}/contacts`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data: ids
    });
  }

  getAssign(token: string) {
    return this.request.get(`${this.base}/${this.employerId}/contacts/assign`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }

  getAssignById(contactId: string, token: string) {
    return this.request.get(`${this.base}/${this.employerId}/contacts/assign/${contactId}`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }

  updateAssign(data: any, token: string) {
    return this.request.put(`${this.base}/${this.employerId}/contacts/assign`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data
    });
  }
}