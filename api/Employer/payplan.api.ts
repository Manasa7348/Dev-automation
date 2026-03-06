export class PayPlanAPI {
  private request: any;
  private base = `/v1/employers`;
  private employerId = '9a694b9b-74aa-4917-81b4-ae47dfdb7fff';

  constructor(request: any) {
    this.request = request;
  }

  getAll(token: string) {
    return this.request.get(`${this.base}/${this.employerId}/pay-plan`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }

  getById(ppId: string, token: string) {
    return this.request.get(`${this.base}/${this.employerId}/pay-plan/${ppId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }

  create(data: any, token: string) {
    return this.request.post(`${this.base}/${this.employerId}/pay-plan`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data
    });
  }

  update(ppId: string, data: any, token: string) {
    return this.request.put(`${this.base}/${this.employerId}/pay-plan/${ppId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data
    });
  }

  delete(ppId: string, token: string) {
    return this.request.delete(`${this.base}/${this.employerId}/pay-plan/${ppId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }
}