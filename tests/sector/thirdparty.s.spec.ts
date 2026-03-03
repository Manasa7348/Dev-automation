import { test, expect } from '../../fixtures/apifixture';
import { ThirdPartyAPI } from '../../api/sector/thirdparty.s.api';
import { TestReporter, assertStep } from '../../utils/reporter';

let thirdPartyId: string;

test('Employer Third Party API Tests', async ({ request, token, employerId }) => {

  const tp = new ThirdPartyAPI(request);
  const report = new TestReporter('Sector - Third Party');

  const uniqueName = `TP-Auto-${Date.now()}`;

  // ─────────────────────────────
  // GET ALL
  // ─────────────────────────────
  await assertStep(report, 'GET Third Parties', async () => {
    const res = await tp.getAll(employerId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────
  // CREATE
  // ─────────────────────────────
  await assertStep(report, 'Create Third Party', async () => {
    const res = await tp.create(employerId, [
      {
        tpName: uniqueName,
        accNo: '12345678',
        sortcode: '100200',
        pdMethod: 0,
        payDate: 15,
        ref: 'auto',
        refCust: 'auto'
      }
    ], token);

    const body = await res.json();

    expect(res.status()).toBe(200);
    expect(body.isSuccess).toBeTruthy();

    thirdPartyId = body.result[0];
  });

  // ─────────────────────────────
  // GET BY ID
  // ─────────────────────────────
  await assertStep(report, 'GET Third Party By ID', async () => {
    const res = await tp.getById(employerId, thirdPartyId, token);
    const body = await res.json();

    expect(res.status()).toBe(200);
    expect(body.result.tpName).toBe(uniqueName);
  });

  // ─────────────────────────────
  // UPDATE
  // ─────────────────────────────
  await assertStep(report, 'Update Third Party', async () => {
    const res = await tp.update(employerId, thirdPartyId, {
      tpId: thirdPartyId,
      tpName: `${uniqueName}-Updated`,
      accNo: '87654321',
      sortcode: '300400',
      pdMethod: 1,
      payDate: 7,
      ref: 'updated',
      refCust: 'updated'
    }, token);

    const body = await res.json();

    expect(res.status()).toBe(200);
    expect(body.result).toBeTruthy();
  });

  // ─────────────────────────────
  // ARCHIVE
  // ─────────────────────────────
  await assertStep(report, 'Archive Third Party', async () => {
    const res = await tp.archive(employerId, thirdPartyId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────
  // UNARCHIVE
  // ─────────────────────────────
  await assertStep(report, 'Unarchive Third Party', async () => {
    const res = await tp.unarchive(employerId, thirdPartyId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────
  // DELETE
  // ─────────────────────────────
  await assertStep(report, 'Delete Third Party', async () => {
    const res = await tp.delete(employerId, thirdPartyId, token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});

test.afterEach(async ({ request, token, employerId }) => {
  if (thirdPartyId) {
    try {
      const tp = new ThirdPartyAPI(request);
      await tp.delete(employerId, thirdPartyId, token);
      thirdPartyId = undefined as any; // reset
    } catch (error) {
      console.log('Cleanup failed:', error);
    }
  }
});