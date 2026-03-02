import { APIRequestContext } from '@playwright/test';

export class SkillsAPI {
  constructor(private request: APIRequestContext) {}

  getAll(token: string) {
    return this.request.get('/v1/community/skills', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getById(skillId: string, token: string) {
    return this.request.get(`/v1/community/skills/${skillId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addSkill(payload: any[], token: string) {
    return this.request.post('/v1/community/skills', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateSkill(payload: any, token: string) {
    return this.request.put('/v1/community/skills', {
      data: payload,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deleteSkill(skillId: string, token: string) {
    return this.request.delete(`/v1/community/skills?skillId=${skillId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  downloadTemplate(token: string) {
    return this.request.get('/v1/community/skills/template', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
