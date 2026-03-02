import { test, expect } from '../../fixtures/apifixture';
import { PayElementAPI } from '../../api/community/payelements.c.api';
import { TestReporter, assertStep } from '../../utils/reporter';

let payElementId: string;

test('Pay Element API Framework Tests', async ({ request, token }) => {
  const payElement = new PayElementAPI(request);
  const report = new TestReporter('Community › PayElements');

  // ─────────────────────────────────────────
  // GET ALL
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Pay Elements', async () => {
    const res = await payElement.getAll(token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // CREATE
  // ─────────────────────────────────────────

  const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(7)}`;

  await assertStep(report, 'POST Add Pay Element', async () => {
    const res = await payElement.addPayElement(
      [
        {
          peName: `Playwright Test PE`,
          peType: 0,
          peTax: true,
          peNi: true,
          peTps: true,
          peTpsBand: true,
          peThirdParty: true,
          peLgps: true,
          peLgpsBand: true,
          peUsedFor1: 10,
          peUsedFor1String: '10',
          peSystemId: 0
        }
      ],
      token
    );

    expect(res.status()).toBe(200);
    const body = await res.json();

    if (body.isSuccess || body.IsSuccess) {
      payElementId = body.result[0];
    } else {
      throw new Error(`Failed to add pay element: ${body.message || body.Message}`);
    }
  });

  // ─────────────────────────────────────────
  // GET BY ID
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Pay Element By ID', async () => {
    const res = await payElement.getById(payElementId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // UPDATE
  // ─────────────────────────────────────────

  await assertStep(report, 'PUT Update Pay Element', async () => {
    const res = await payElement.updatePayElement(
      payElementId,
      {
        peId: payElementId,
        peName: `Playwright Test PE Updated ${uniqueId}`,
        peType: 0,
        peTax: true,
        peNi: true,
        peTps: true,
        peTpsBand: true,
        peThirdParty: true,
        peLgps: true,
        peLgpsBand: true,
        peUsedFor1: 5,
        peUsedFor1String: '5',
        peSystemId: 0
      },
      token
    );

    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────

  await assertStep(report, 'DELETE Pay Element', async () => {
    const res = await payElement.deletePayElement(payElementId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // DOWNLOAD TEMPLATE
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Download Template', async () => {
    const res = await payElement.downloadTemplate(token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});

// ✅ Cleanup hook (kept outside reporter intentionally)
test.afterEach(async ({ request, token }) => {
  if (payElementId) {
    try {
      const payElement = new PayElementAPI(request);
      await payElement.deletePayElement(payElementId, token);
    } catch {
      // already deleted or not found
    }
  }
});