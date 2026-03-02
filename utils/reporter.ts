export interface OperationResult {
  label: string;
  status: "pass" | "fail";
  detail?: string;
}

export class TestReporter {
  private module: string;
  private results: OperationResult[] = [];
  private startTime: number;

  constructor(moduleName: string) {
    this.module = moduleName;
    this.startTime = Date.now();
  }

  pass(label: string, detail?: string) {
    this.results.push({ label, status: "pass", detail });
  }

  fail(label: string, detail?: string) {
    this.results.push({ label, status: "fail", detail });
  }

  summary() {
    const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(1);
    const passed  = this.results.filter(r => r.status === "pass").length;
    const failed  = this.results.filter(r => r.status === "fail").length;
    const total   = this.results.length;
    const icon    = failed > 0 ? "❌" : "✅";
    const line    = "─".repeat(60);

    console.log(`\n${line}`);
    console.log(`${icon}  MODULE : ${this.module}`);
    console.log(`   Total  : ${total}  |  ✅ ${passed} passed  |  ❌ ${failed} failed  |  ⏱ ${elapsed}s`);

    if (failed > 0) {
      console.log(`\n   Failed Operations:`);
      this.results
        .filter(r => r.status === "fail")
        .forEach(r => console.log(`     ✗ ${r.label}${r.detail ? ` → ${r.detail}` : ""}`));
    } else {
      const flow = this.results.map(r => r.label).join(" → ");
      console.log(`   Flow   : ${flow}`);
    }

    console.log(`${line}\n`);
  }
}

export async function assertStep(
  reporter: TestReporter,
  label: string,
  fn: () => Promise<void>
) {
  try {
    await fn();
    reporter.pass(label);
  } catch (err: any) {
    reporter.fail(label, err?.message ?? String(err));
    throw err;
  }
}