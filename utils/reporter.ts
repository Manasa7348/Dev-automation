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

const _registry: ModuleSnapshot[] = [];
const _suiteStart = Date.now();

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
  }

  fail(label: string, durationMs?: number) {
    this.results.push({ label, status: "fail", durationMs });
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
  } catch {
    reporter.fail(label, Date.now() - t);
    return false;
  }
}

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