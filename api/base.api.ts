import { APIRequestContext } from '@playwright/test'
import fs from 'fs'
import path from 'path'

export class BaseAPI {
  constructor(protected request: APIRequestContext) {}

  async postFormData(
    url: string,
    filePath: string,
    fieldName: string,
    token: string
  ) {
    const fullPath = path.resolve(filePath)

    return await this.request.post(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      multipart: {
        [fieldName]: {
          name: path.basename(fullPath),   // VERY IMPORTANT
          mimeType: fullPath.endsWith('.png')
            ? 'image/png'
            : 'image/jpeg',
          buffer: fs.readFileSync(fullPath)
        }
      }
    })
  }
}