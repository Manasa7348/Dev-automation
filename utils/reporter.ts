import fs from 'fs'
import path from 'path'

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

export interface OperationResult {
  label: string;
  status: "pass" | "fail";
  durationMs?: number;
}

interface ModuleSnapshot {
  name: string;
  passed: number;
  failed: number;
  total: number;
  durationMs: number;
}

type ModuleStats = {
  passed: number
  failed: number
}

// ─────────────────────────────────────────
// FILE PATH
// ─────────────────────────────────────────

const RESULTS_FILE = path.resolve(
  process.cwd(),
  'test-results',
  'module-stats.json'
)



// ─────────────────────────────────────────
// FILE HELPERS
// ─────────────────────────────────────────

function ensureFile() {
  const dir = path.dirname(RESULTS_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(RESULTS_FILE)) {
    fs.writeFileSync(RESULTS_FILE, JSON.stringify({}))
  }
}

function readStats(): Record<string, ModuleStats> {
  ensureFile()
  const raw = fs.readFileSync(RESULTS_FILE, 'utf-8')
  return JSON.parse(raw)
}

function writeStats(data: Record<string, ModuleStats>) {
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(data, null, 2))
}

// ─────────────────────────────────────────
// FILE-BASED TRACKING
// Survives across spec files and CI crashes
// ─────────────────────────────────────────

export function recordPass(moduleName: string) {
  const stats = readStats()
  if (!stats[moduleName]) stats[moduleName] = { passed: 0, failed: 0 }
  stats[moduleName].passed++
  writeStats(stats)
}

export function recordFail(moduleName: string) {
  const stats = readStats()
  if (!stats[moduleName]) stats[moduleName] = { passed: 0, failed: 0 }
  stats[moduleName].failed++
  writeStats(stats)
}

export function printModuleSummary(moduleName: string) {
  const stats = readStats()[moduleName] || { passed: 0, failed: 0 }
  console.log('\n==============================')
  console.log(`📦 ${moduleName} Summary`)
  console.log(`✅ Passed: ${stats.passed}`)
  console.log(`❌ Failed: ${stats.failed}`)
  console.log('==============================\n')
}

export function printGlobalSummary() {
  console.log('\n========== GLOBAL API SUMMARY ==========')
  
  // debug line — remove after confirming it works
  console.log('[printGlobalSummary] reading from:', RESULTS_FILE)
  console.log('[printGlobalSummary] file exists:', fs.existsSync(RESULTS_FILE))

  const statsMap = readStats()
  const entries = Object.entries(statsMap)

  if (entries.length === 0) {
    console.log('No data found in module-stats.json')
    console.log('========================================\n')
    return
  }

  let totalPassed = 0
  let totalFailed = 0

  for (const [module, stats] of entries) {
    totalPassed += stats.passed
    totalFailed += stats.failed
    console.log(
      `${module.padEnd(25)} → Passed: ${stats.passed}  Failed: ${stats.failed}`
    )
  }

  console.log('----------------------------------------')
  console.log(`TOTAL`.padEnd(25) + ` → Passed: ${totalPassed}  Failed: ${totalFailed}`)
  console.log('========================================\n')
}

// ─────────────────────────────────────────
// IN-MEMORY REPORTER
// Tracks steps inside a single spec file
// ─────────────────────────────────────────

const _registry: ModuleSnapshot[] = []
const _suiteStart = Date.now()

export class TestReporter {
  private module: string;
  private results: OperationResult[] = [];
  private startTime: number;

  constructor(moduleName: string) {
    this.module = moduleName;
    this.startTime = Date.now();
  }

  pass(label: string, durationMs?: number) {
    this.results.push({ label, status: "pass", durationMs });
    recordPass(this.module) // writes to JSON file
  }

  fail(label: string, durationMs?: number) {
    this.results.push({ label, status: "fail", durationMs });
    recordFail(this.module) // writes to JSON file
  }

  summary() {
    const passed = this.results.filter(r => r.status === "pass").length;
    const failed = this.results.filter(r => r.status === "fail").length;
    const total = this.results.length;
    const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(1);
    const icon = failed > 0 ? "❌" : "✅";

    console.log(
      `${icon} ${this.module}  |  APIs: ${total}  |  Passed: ${passed}  |  Failed: ${failed}  |  ${elapsed}s`
    );

    if (failed > 0) {
      console.log("   Failed Steps:");
      this.results
        .filter(r => r.status === "fail")
        .forEach(r => console.log(`   ✗ ${r.label}`));
    }

    _registry.push({
      name: this.module,
      passed,
      failed,
      total,
      durationMs: Date.now() - this.startTime,
    });
  }
}

// ─────────────────────────────────────────
// SUITE SUMMARY — in memory only
// Only works within single process
// ─────────────────────────────────────────

export function printSuiteSummary(): void {
  const totalModules = _registry.length;
  const totalPassed = _registry.reduce((s, m) => s + m.passed, 0);
  const totalFailed = _registry.reduce((s, m) => s + m.failed, 0);
  const totalApis = _registry.reduce((s, m) => s + m.total, 0);
  const elapsed = ((Date.now() - _suiteStart) / 1000).toFixed(1);

  console.log("\n──────── TEST SUITE SUMMARY ────────");
  _registry.forEach(m => {
    const dur = (m.durationMs / 1000).toFixed(1);
    const icon = m.failed > 0 ? "❌" : "✅";
    console.log(`${icon} ${m.name}  |  ${m.passed}/${m.total} passed  |  ${dur}s`);
  });
  console.log(
    `\nModules: ${totalModules}  |  APIs: ${totalApis}  |  Passed: ${totalPassed}  |  Failed: ${totalFailed}  |  Time: ${elapsed}s`
  );
}

// ─────────────────────────────────────────
// STEP RUNNER
// Catches failures and continues the suite
// ─────────────────────────────────────────

export async function assertStep(
  reporter: TestReporter,
  label: string,
  fn: () => Promise<void>
): Promise<boolean> {
  const t = Date.now();
  try {
    await fn();
    reporter.pass(label, Date.now() - t);
    return true;
  } catch (err: any) {
    reporter.fail(label, Date.now() - t);
    console.log(`   ✗ ${label}: ${err?.message ?? err}`);
    return false;
  }
}

// ─────────────────────────────────────────
// VALIDATORS
// ─────────────────────────────────────────

export function assertSuccess(body: any): void {
  if (!body.isSuccess && !body.IsSuccess) {
    throw new Error(
      `API returned isSuccess: false — ${body.message ?? body.Message ?? JSON.stringify(body)}`
    );
  }
}

export function assertDefined(value: any, name: string): void {
  if (value === undefined || value === null) {
    throw new Error(`Skipped — '${name}' is not set (previous step likely failed)`);
  }
}

// ─────────────────────────────────────────
// CUSTOM PLAYWRIGHT REPORTER
// Shows skipped tests in terminal
// ─────────────────────────────────────────

import type {
  Reporter,
  TestCase,
  TestResult,
  FullResult
} from '@playwright/test/reporter';

class CustomReporter implements Reporter {
  private passed = 0;
  private failed = 0;
  private skipped = 0;
  private failedTests: string[] = [];
  private skippedTests: string[] = [];

  onTestEnd(test: TestCase, result: TestResult) {
    const name = test.title;

    if (result.status === 'passed') {
      this.passed++;
    } else if (result.status === 'skipped') {
      this.skipped++;
      this.skippedTests.push(`   ⏭  ${name}`);
    } else if (result.status === 'failed' || result.status === 'timedOut') {
      this.failed++;
      this.failedTests.push(`   ✗  ${name}`);
    }
  }

  onEnd(result: FullResult) {
    console.log('\n─────────────────────────────────────────────')
    console.log('  TEST RUN SUMMARY')
    console.log('─────────────────────────────────────────────')
    console.log(`  ✅ Passed  : ${this.passed}`)
    console.log(`  ❌ Failed  : ${this.failed}`)
    console.log(`  ⏭  Skipped : ${this.skipped}`)

    if (this.failedTests.length > 0) {
      console.log('\n  Failed Tests:')
      this.failedTests.forEach(t => console.log(t))
    }

    if (this.skippedTests.length > 0) {
      console.log('\n  Skipped Tests:')
      this.skippedTests.forEach(t => console.log(t))
    }

    console.log('─────────────────────────────────────────────\n')
  }
}

export { CustomReporter };