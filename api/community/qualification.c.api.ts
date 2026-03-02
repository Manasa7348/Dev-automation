import { APIRequestContext } from '@playwright/test';

export class QualificationAPI {
  constructor(private request: APIRequestContext) {}

  getAll(token: string) {
    return this.request.get('/v1/community/qualifications', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getById(qualificationId: string, token: string) {
    return this.request.get(`/v1/community/qualifications/${qualificationId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addQualification(payload: any[], token: string) {
    return this.request.post('/v1/community/qualifications', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateQualification(payload: any, token: string) {
    return this.request.put('/v1/community/qualifications', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deleteQualification(qualificationId: string, token: string) {
    return this.request.delete(`/v1/community/qualifications?id=${qualificationId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  downloadTemplate(token: string) {
    return this.request.get('/v1/community/qualifications/template', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
