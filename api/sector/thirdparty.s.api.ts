export class ThirdPartyAPI {
  private request: any;
  private version = '1';

  constructor(request: any) {
    this.request = request;
  }

  private base(employerId: string) {
    return `/v${this.version}/${employerId}/third-parties`;
  }

  getAll(employerId: string, token: string) {
    return this.request.get(this.base(employerId), {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }

  getById(employerId: string, id: string, token: string) {
    return this.request.get(`${this.base(employerId)}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }

  create(employerId: string, data: any, token: string) {
    return this.request.post(this.base(employerId), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data
    });
  }

  update(employerId: string, id: string, data: any, token: string) {
    return this.request.put(`${this.base(employerId)}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data
    });
  }

  delete(employerId: string, id: string, token: string) {
    return this.request.delete(`${this.base(employerId)}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }

  archive(employerId: string, id: string, token: string) {
    return this.request.put(`${this.base(employerId)}/${id}/archive`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }

  unarchive(employerId: string, id: string, token: string) {
    return this.request.put(`${this.base(employerId)}/${id}/unarchive`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }
}