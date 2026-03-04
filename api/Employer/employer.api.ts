import { APIRequestContext } from '@playwright/test';
 import path from 'path';
 import fs from 'fs';
export class EmployersAPI {
  constructor(private request: APIRequestContext, private token: string) {}

  // GET All Employers
  async getAll(sectorId: string) {
    return this.request.get(`/v1/employers?sectorId=${sectorId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  // GET Employer By ID
  async getById(erId: string) {
    return this.request.get(`/v1/employers/${erId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  // POST Add Employer
  async addEmployer(payload: any) {
    return this.request.post(`/v1/employers`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      data: payload,
    });
  }

  // PUT Update Employer
  async updateEmployer(payload: any) {
    return this.request.put(`/v1/employers`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      data: payload,
    });
  }

  // POST Upload Logo


async uploadLogo(erId: string) {
  const filePath = path.resolve(
    __dirname,
    '../../tests/assets/download.jpg'
  );

  const fileBuffer = fs.readFileSync(filePath);

  return this.request.post(
    `/v1/employers/logo?employerId=${erId}`,
    {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      multipart: {
        file: {
          name: 'download.jpg',
          mimeType: 'image/jpeg',
          buffer: fileBuffer,
        },
      },
    }
  );
}

  // GET Logo
  async getLogo(erId: string) {
    return this.request.get(`/v1/employers/${erId}/logo`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

//   // DELETE Employer
//   async deleteEmployer(erId: string) {
//     return this.request.delete(
//       `/v1/employers?employerId=${erId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//         },
//       }
//     );
//   }
}