import fs from 'fs'
import path from 'path'

export default async () => {
  const file = path.resolve(process.cwd(), 'test-results', 'module-stats.json')
  if (fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify({})) // clears old run data
  }
}