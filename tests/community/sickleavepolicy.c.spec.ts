import { test, expect } from '../../fixtures/apifixture';
import { SickLeavePolicyAPI } from '../../api/community/sickleavepolicy.c.api';
import { TestReporter, assertStep } from '../../utils/reporter';
import path from 'path';

let slpId: string;

test('Sick Leave Policy API Framework Tests', async ({ request, token }) => {
  const sickLeavePolicy = new SickLeavePolicyAPI(request, token);
  const report = new TestReporter('Community › SickLeavePolicy');

  // ─────────────────────────────────────────
  // PRE-CLEANUP
  // ─────────────────────────────────────────

  await assertStep(report, 'Pre-cleanup Existing Sick Leave Policies', async () => {
    const allRes = await sickLeavePolicy.getAll(token);
    const allBody = await allRes.json();

    if (allBody.result) {
      for (const slp of allBody.result) {
        if (slp.slpName === 's420' || slp.slpName === 's4') {
          await sickLeavePolicy.deleteSickLeavePolicy(slp.slpId, token);
        }
      }
    }
  });

  // ─────────────────────────────────────────
  // CRUD
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Sick Leave Policies', async () => {
    const res = await sickLeavePolicy.getAll(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'POST Add Sick Leave Policy', async () => {
    const res = await sickLeavePolicy.addSickLeavePolicy(
      {
        slpName: 's420',
        slpDesc: 'st',
        slpType: 1,
        isHidden: true,
        slpItems: [
          {
            threshold: 20,
            value: 12,
            pay: 15,
            ssp: false,
            ordering: 0
          }
        ],
        uploadFile: 'string',
        logo: true,
        logoExtension: '.jpg',
        logoCnt: 0
      },
      token
    );

    expect(res.status()).toBe(200);
    const body = await res.json();

    if (body.isSuccess || body.IsSuccess) {
      slpId = body.result;
    } else {
      throw new Error(
        `Failed to add sick leave policy: ${body.message || body.Message}`
      );
    }
  });

  // ─────────────────────────────────────────
  // LOGO
  // ─────────────────────────────────────────

  const filePath = path.resolve('tests/assets/download.jpg');

  await assertStep(report, 'POST Upload Logo', async () => {
    const res = await sickLeavePolicy.uploadLogo(slpId, filePath);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Logo', async () => {
    const res = await sickLeavePolicy.getLogo(slpId);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // GET BY ID / UPDATE
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Sick Leave Policy By ID', async () => {
    const res = await sickLeavePolicy.getById(slpId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PUT Update Sick Leave Policy', async () => {
    const res = await sickLeavePolicy.updateSickLeavePolicy(
      slpId,
      {
        slpId: slpId,
        slpName: 's4',
        slpDesc: 'str',
        slpType: 1,
        isHidden: false,
        slpItems: [
          {
            threshold: 2,
            value: 3,
            pay: 4,
            ssp: true,
            ordering: 0
          }
        ],
        uploadFile: 'string',
        logo: true,
        logoExtension: '.jpg',
        logoCnt: 0
      },
      token
    );

    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // ARCHIVE / UNARCHIVE
  // ─────────────────────────────────────────

  await assertStep(report, 'PATCH Archive Sick Leave Policy', async () => {
    const res = await sickLeavePolicy.archiveSickLeavePolicy(slpId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PATCH Unarchive Sick Leave Policy', async () => {
    const res = await sickLeavePolicy.unarchiveSickLeavePolicy(slpId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // TEMPLATE & EXPORT
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Download Template', async () => {
    const res = await sickLeavePolicy.downloadTemplate(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Export Sick Leave Policy', async () => {
    const res = await sickLeavePolicy.exportSickLeavePolicy(slpId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────

  await assertStep(report, 'DELETE Sick Leave Policy', async () => {
    const res = await sickLeavePolicy.deleteSickLeavePolicy(slpId, token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});
test.afterEach(async ({ request, token }) => {
  if (slpId) {
    try {
      const sickLeavePolicy = new SickLeavePolicyAPI(request, token);
      await sickLeavePolicy.deleteSickLeavePolicy(slpId, token);
      slpId = undefined as any; // reset
    } catch (error) {
      console.log('Cleanup failed:', error);
    }
  }
});