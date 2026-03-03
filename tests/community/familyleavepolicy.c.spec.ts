import { test, expect } from '../../fixtures/apifixture';
import { FamilyLeavePolicyAPI } from '../../api/community/familyleavepolicy.c.api';
import { TestReporter, assertStep } from '../../utils/reporter';
import path from 'path';

let flpId: string;

test('Family Leave Policy API Framework Tests', async ({ request, token }) => {
  const familyLeavePolicy = new FamilyLeavePolicyAPI(request, token);
  const report = new TestReporter('Community › Family Leave Policy');
  const filePath = path.resolve('tests/assets/download.jpg');

  // ── Pre-cleanup ──────────────────────────────────────────
  const allRes = await familyLeavePolicy.getAll(token);
  const allBody = await allRes.json();
  if (allBody.result) {
    for (const flp of allBody.result) {
      if (flp.sflName === 'flp 420' || flp.sflName === 'flp4201 update') {
        await familyLeavePolicy.deleteFamilyLeavePolicy(flp.sflId, token);
      }
    }
  }

  // ── Tests ────────────────────────────────────────────────
  await assertStep(report, 'GET All', async () => {
    const res = await familyLeavePolicy.getAll(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'POST Create', async () => {
    const res = await familyLeavePolicy.addFamilyLeavePolicy({
      flpname: 'flp 420',
      flpdesc: 'st',
      flptype: 2,
      isHidden: false,
      flpItems: [{ threshold: 10, value: 15, pay: 85, plus: true, ordering: 0 }],
      uploadFile: 'string',
      logo: true,
      logoExtension: '.jpg'
    }, token);
    expect(res.status()).toBe(200);
    const body = await res.json();
    if (!body.isSuccess && !body.IsSuccess) throw new Error(body.message || body.Message);
    flpId = body.result;
  });

  await assertStep(report, 'POST Upload Logo', async () => {
    const res = await familyLeavePolicy.uploadLogo(flpId, filePath);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Logo', async () => {
    const res = await familyLeavePolicy.getLogo(flpId);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET By ID', async () => {
    const res = await familyLeavePolicy.getById(flpId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET By Type', async () => {
    const res = await familyLeavePolicy.getByType(2, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PUT Update', async () => {
    const res = await familyLeavePolicy.updateFamilyLeavePolicy(flpId, {
      flpid: flpId,
      flpname: 'flp4201 update',
      flpdesc: 'strs',
      flptype: 2,
      isHidden: true,
      flpItems: [{ threshold: 18, value: 25, pay: 65, plus: true, ordering: 0 }],
      uploadFile: 'string',
      logo: true,
      logoExtension: '.jpg'
    }, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PATCH Archive', async () => {
    const res = await familyLeavePolicy.archiveFamilyLeavePolicy(flpId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PATCH Unarchive', async () => {
    const res = await familyLeavePolicy.unarchiveFamilyLeavePolicy(flpId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Template', async () => {
    const res = await familyLeavePolicy.downloadTemplate(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Export', async () => {
    const res = await familyLeavePolicy.exportFamilyLeavePolicy(flpId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'DELETE', async () => {
    const res = await familyLeavePolicy.deleteFamilyLeavePolicy(flpId, token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});

test.afterEach(async ({ request, token }) => {
  if (flpId) {
    try {
      const familyLeavePolicy = new FamilyLeavePolicyAPI(request, token);
      await familyLeavePolicy.deleteFamilyLeavePolicy(flpId, token);
      flpId = undefined as any; // reset
    } catch (error) {
      console.log('Cleanup failed:', error);
    }
  }
});