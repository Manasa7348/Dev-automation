import * as fs from 'fs'
import * as path from 'path'

export class LocationsAPI {
  private request: any;
  private base = `/v1/employers`;
  private employerId = '9a694b9b-74aa-4917-81b4-ae47dfdb7fff';

  constructor(request: any) {
    this.request = request;
  }

  getAll(token: string) {
    return this.request.get(`${this.base}/${this.employerId}/locations`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }

  getById(locId: string, token: string) {
    return this.request.get(`${this.base}/${this.employerId}/locations/${locId}`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }

  getLookup(token: string) {
    return this.request.get(`${this.base}/${this.employerId}/locations/lookup`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }

  create(data: any, token: string) {
    return this.request.post(`${this.base}/${this.employerId}/locations`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data
    });
  }

  update(locId: string, data: any, token: string) {
    return this.request.put(`${this.base}/${this.employerId}/locations/${locId}`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data
    });
  }

  delete(locId: string, token: string) {
    return this.request.delete(`${this.base}/${this.employerId}/locations/${locId}`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }

  uploadLogo(locId: string, filePath: string, token: string) {
    const buffer = fs.readFileSync(filePath)
    const fileName = path.basename(filePath)
    return this.request.post(`${this.base}/${this.employerId}/locations/${locId}/logo`, {
      headers: { Authorization: `Bearer ${token}` },
      multipart: {
        file: {
          name: fileName,
          mimeType: 'image/jpeg',
          buffer
        }
      }
    });
  }

  getLogo(locId: string, token: string) {
    return this.request.get(`${this.base}/${this.employerId}/locations/${locId}/logo`, {
      headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }
    });
  }
}