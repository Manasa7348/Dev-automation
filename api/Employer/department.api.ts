export class DepartmentAPI {
  private request: any;
  private base = `/v1/employers`;
  private employerId = '9a694b9b-74aa-4917-81b4-ae47dfdb7fff';

  constructor(request: any) {
    this.request = request;
  }

  // GET All Departments
  getAll(token: string) {
    return this.request.get(`${this.base}/${this.employerId}/department`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
  }

  // GET Department by ID
  getById(deptId: string, token: string) {
    return this.request.get(
      `${this.base}/${this.employerId}/department/${deptId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json'
        }
      }
    );
  }

  // POST Create Department
  create(data: any, token: string) {
    return this.request.post(`${this.base}/${this.employerId}/department`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data
    });
  }

  // PUT Update Department
  update(data: any, token: string) {
    return this.request.put(`${this.base}/${this.employerId}/department`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data
    });
  }

 // DELETE Department
  delete(deptId: string, token: string) {
    return this.request.delete(
      `${this.base}/${this.employerId}/department?id=${deptId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json'
        }
      }
    );
  }

  // GET Department Template
  getTemplate(token: string) {
    return this.request.get(
      `${this.base}/${this.employerId}/department/template`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json'
        }
      }
    );
  }
}