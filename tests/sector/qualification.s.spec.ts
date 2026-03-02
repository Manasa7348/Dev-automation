import { test, expect } from '../../fixtures/apifixture';
import { QualificationAPI } from '../../api/sector/qualification.s.api';
import { TestReporter, assertStep } from '../../utils/reporter';

let qualificationId: string;

test('Sector Qualification API Framework Tests', async ({ request, token }) => {

  const qualification = new QualificationAPI(request);
  const report = new TestReporter('Sector - Qualification');

  // ─────────────────────────────
  // GET ALL
  // ─────────────────────────────
  await assertStep(report, 'GET All Qualifications', async () => {
    const res = await qualification.getAll(token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────
  // CREATE
  // ─────────────────────────────
  await assertStep(report, 'Create Qualification', async () => {
    const res = await qualification.addQualification([
      {
        quName: 'sector420',
        wfCode: 'FRST'
      }
    ], token);

    const body = await res.json();
    expect(res.status()).toBe(200);
    expect(body.isSuccess || body.IsSuccess).toBeTruthy();

    qualificationId = body.result[0];
  });

  // ─────────────────────────────
  // GET BY ID
  // ─────────────────────────────
  await assertStep(report, 'GET Qualification By ID', async () => {
    const res = await qualification.getById(qualificationId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────
  // UPDATE
  // ─────────────────────────────
  await assertStep(report, 'Update Qualification', async () => {
    const res = await qualification.updateQualification({
      quId: qualificationId,
      quName: 'sector420 updated',
      wfCode: 'NQF3'
    }, token);

    const body = await res.json();
    expect(res.status()).toBe(200);
    expect(body.isSuccess || body.IsSuccess).toBeTruthy();
  });

  // ─────────────────────────────
  // DELETE
  // ─────────────────────────────
  await assertStep(report, 'Delete Qualification', async () => {
    const res = await qualification.deleteQualification(qualificationId, token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});