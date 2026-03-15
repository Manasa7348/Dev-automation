import * as fs from 'fs'
import * as path from 'path'

const FILE = path.resolve(__dirname, 'shared-ids.json')

if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, JSON.stringify({ locId: '', contactId: '' }, null, 2))
}

export function getIds() {
  return JSON.parse(fs.readFileSync(FILE, 'utf-8'))
}

export function saveIds(ids: Record<string, string>) {
  fs.writeFileSync(FILE, JSON.stringify(ids, null, 2))
}

export function clearIds() {
  fs.writeFileSync(FILE, JSON.stringify({ locId: '', contactId: '' }, null, 2))
}