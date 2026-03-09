import fs from 'fs';
import path from 'path';

export default async () => {
  const file = path.resolve(process.cwd(), 'test-results', 'module-stats.json')

  if (!fs.existsSync(file)) {
    console.log('No test results found')
    return
  }

  const statsMap = JSON.parse(fs.readFileSync(file, 'utf-8'))
  const entries = Object.entries(statsMap) as [string, { passed: number; failed: number }][]

  if (entries.length === 0) {
    console.log('No data found')
    return
  }

  let totalPassed = 0
  let totalFailed = 0
  let totalAPIs   = 0

  // clear separator so it stands out from Playwright red output
  process.stdout.write('\n\n')
  process.stdout.write('─────────────────────────────────────────────────\n')
  process.stdout.write('  API TEST SUMMARY\n')
  process.stdout.write('─────────────────────────────────────────────────\n')

  for (const [module, stats] of entries) {
    totalPassed += stats.passed
    totalFailed += stats.failed
    totalAPIs   += stats.passed + stats.failed

    const icon  = stats.failed > 0 ? '❌' : '✅'
    const name  = module.padEnd(35)
    const score = `${stats.passed} / ${stats.passed + stats.failed}`

    process.stdout.write(`  ${icon} ${name} ${score.padStart(7)}\n`)
  }

  process.stdout.write('─────────────────────────────────────────────────\n')

  const totalIcon  = totalFailed > 0 ? '❌' : '✅'
  const totalScore = `${totalPassed} / ${totalAPIs}`

  process.stdout.write(`  ${totalIcon} ${'TOTAL'.padEnd(35)} ${totalScore.padStart(7)}\n`)
  process.stdout.write('─────────────────────────────────────────────────\n')
  process.stdout.write(`\n  📦 ${entries.length} Modules   ✅ ${totalPassed} Passed   ❌ ${totalFailed} Failed\n\n`)
};