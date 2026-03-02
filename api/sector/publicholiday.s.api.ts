export class PublicHolidayAPI {
  private request: any;
  private base = `/v1/system/publicholidays`;

  constructor(request: any) {
    this.request = request;
  }

  getAll(region: string, token: string) {
    return this.request.get(`${this.base}?region=${region}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }

  getById(id: string, token: string) {
    return this.request.get(`${this.base}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }

  create(data: any, token: string) {
    return this.request.post(`${this.base}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data
    });
  }

  update(id: string, data: any, token: string) {
    return this.request.put(`${this.base}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data
    });
  }

  delete(id: string, token: string) {
    return this.request.delete(`${this.base}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }
}