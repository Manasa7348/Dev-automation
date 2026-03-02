import { APIRequestContext } from '@playwright/test';

export class DepartmentsAPI {
  constructor(private request: APIRequestContext) {}

  getAll(token: string) {
    return this.request.get('/v1/community/departments', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getById(departmentId: string, token: string) {
    return this.request.get(`/v1/community/departments/${departmentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addDepartment(payload: any[], token: string) {
    return this.request.post('/v1/community/departments', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateDepartment(payload: any, token: string) {
    return this.request.put('/v1/community/departments', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deleteDepartment(departmentId: string, token: string) {
    return this.request.delete(`/v1/community/departments?id=${departmentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  downloadTemplate(token: string) {
    return this.request.get('/v1/community/departments/template', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
