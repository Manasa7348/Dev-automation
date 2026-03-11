export class QualificationAPI {
  private request: any;
  private base = `/v1/employers`;
  private employerId = '9a694b9b-74aa-4917-81b4-ae47dfdb7fff';

  constructor(request: any) {
    this.request = request;
  }

  getAll(token: string) {
    return this.request.get(`${this.base}/${this.employerId}/qualifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }

  getById(quId: string, token: string) {
    return this.request.get(`${this.base}/${this.employerId}/qualifications/${quId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }

  create(data: any, token: string) {
    return this.request.post(`${this.base}/${this.employerId}/qualifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data
    });
  }

  update(data: any, token: string) {
    return this.request.put(`${this.base}/${this.employerId}/qualifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data
    });
  }

  delete(quId: string, token: string) {
    return this.request.delete(`${this.base}/${this.employerId}/qualifications?id=${quId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }

  getTemplate(token: string) {
    return this.request.get(`${this.base}/${this.employerId}/qualifications/template`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: '*/*'
      }
    });
  }
}