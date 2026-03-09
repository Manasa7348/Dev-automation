import { test, expect } from '../../fixtures/apifixture';
import { PayPlanAPI } from '../../api/Employer/payplan.api';
import { TestReporter, assertStep } from '../../utils/reporter';
import { checkDuplicateBeforeCreate } from '../../api/helpers/duplicate';

let ppId: string;

test('Pay Plan API Framework Tests', async ({ request, token }) => {
  const payPlan = new PayPlanAPI(request);
  const report = new TestReporter('Employer › Pay Plan');

  // ── Tests ────────────────────────────────────────────────

  await assertStep(report, 'GET All', async () => {
    const res = await payPlan.getAll(token);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.isSuccess).toBe(true);
  });

  await assertStep(report, 'POST Create', async () => {
     
    const payload = {
      ppNo: 0,
      erNo: 0,
      ppName: 'playwright pay plan',
      ppMethod: 2,
      ppValue: 31
    };

    // Stop test if duplicate exists
    await checkDuplicateBeforeCreate(payPlan, token, payload, 'ppName');

    const res = await payPlan.create(payload, token);
    expect(res.status()).toBe(200);
    const body = await res.json();
    if (!body.isSuccess) throw new Error(body.message);
    ppId = body.result;
  });

  await assertStep(report, 'GET By ID', async () => {
    const res = await payPlan.getById(ppId, token);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.isSuccess).toBe(true);
    expect(body.result.ppId).toBe(ppId);
  });

  await assertStep(report, 'PUT Update', async () => {
    const res = await payPlan.update(ppId, {
      ppId: ppId,
      ppNo: 0,
      erNo: 0,
      ppName: 'Playwright Pay Plan Updated',
      ppMethod: 1,
      ppValue: 0
    }, token);
    expect(res.status()).toBe(200);
    const body = await res.json();
    if (!body.isSuccess) throw new Error(body.message);
  });

  await assertStep(report, 'DELETE', async () => {
    const res = await payPlan.delete(ppId, token);
    expect(res.status()).toBe(200);
    const body = await res.json();
    if (!body.isSuccess) throw new Error(body.message);
  });

  report.summary();
});

test.afterEach(async ({ request, token }) => {
if (ppId) {
try {
const payPlan = new PayPlanAPI(request);
await payPlan.delete(ppId, token);
ppId = undefined as any;
} catch {}
 }
});