export class PayElementsAPI {
  private request: any;
  private base = `/v1/employers`;
  private employerId = '00000000-0000-0000-0000-000000000000';

  constructor(request: any) {
    this.request = request;
  }

  getAll(token: string) {
    return this.request.get(`${this.base}/${this.employerId}/pay-elements`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }

  getById(peId: string, token: string) {
    return this.request.get(`${this.base}/${this.employerId}/pay-elements/${peId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }

  create(data: any, token: string) {
    return this.request.post(`${this.base}/${this.employerId}/pay-elements`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: [data]
    });
  }

  update(peId: string, data: any, token: string) {
    return this.request.put(`${this.base}/${this.employerId}/pay-elements/sector/${peId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data
    });
  }

  archive(peId: string, token: string) {
    return this.request.patch(`${this.base}/${this.employerId}/pay-elements/${peId}/archive`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }

  unarchive(peId: string, token: string) {
    return this.request.patch(`${this.base}/${this.employerId}/pay-elements/${peId}/unarchive`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }

  delete(peId: string, token: string) {
    return this.request.delete(`${this.base}/${this.employerId}/pay-elements/${peId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }
}