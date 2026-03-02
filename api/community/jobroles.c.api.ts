
import { APIRequestContext } from '@playwright/test';

export class JobRolesAPI {
  constructor(private request: APIRequestContext) {}

  getAll(token: string) {
    return this.request.get('/v1/community/job-roles', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getById(jobRoleId: string, token: string) {
    return this.request.get(`/v1/community/job-roles/${jobRoleId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // TODO: Check Swagger for correct POST endpoint and payload structure
  addJobRole(payload: any[], token: string) {
    return this.request.post('/v1/community/job-roles', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateJobRole(jobRoleId: string, payload: any, token: string) {
    return this.request.put(`/v1/community/job-roles/${jobRoleId}`, {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deleteJobRole(jobRoleId: string, token: string) {
    return this.request.delete(`/v1/community/job-roles/${jobRoleId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  downloadTemplate(token: string) {
    return this.request.get('/v1/community/job-roles/template', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
