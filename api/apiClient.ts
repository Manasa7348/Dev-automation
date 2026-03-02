import { APIRequestContext } from '@playwright/test'
import * as fs from 'fs'

import path from 'path'
export class ApiClient {
  protected request: APIRequestContext
  protected token: string

  constructor(request: APIRequestContext, token: string) {
    this.request = request
    this.token = token
  }

  protected url(path: string) {
    return path
  }

async postFormData(
  endpoint: string,
  filePath: string,
  fieldName = 'file'
) {
  const fileName = path.basename(filePath)
  const fileBuffer = fs.readFileSync(filePath)

  return await this.request.post(endpoint, {
    headers: {
      Authorization: `Bearer ${this.token}`
    },
    multipart: {
      [fieldName]: {
        name: fileName,
        mimeType: 'image/jpeg',  // REQUIRED
        buffer: fileBuffer
      }
    }
  })
}
}