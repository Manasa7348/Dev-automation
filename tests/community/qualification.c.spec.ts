import { test, expect } from '../../fixtures/apifixture';
import { QualificationAPI } from '../../api/community/qualification.c.api';
import { TestReporter, assertStep } from '../../utils/reporter';

let qualificationId: string;

test('Qualification API Framework Tests', async ({ request, token }) => {
  const qualifications = new QualificationAPI(request);
  const report = new TestReporter('Community › Qualification');

  // ─────────────────────────────────────────
  // GET ALL
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Qualifications', async () => {
    const res = await qualifications.getAll(token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // CREATE
  // ─────────────────────────────────────────

  const timestamp = Date.now();

  await assertStep(report, 'POST Add Qualification', async () => {
    const res = await qualifications.addQualification(
      [
        {
          quName: `Playwright Qualification ${timestamp}`,
          wfCode: 'NA',
          errorMessage: 'Automation test qualification'
        }
      ],
      token
    );

    expect(res.status()).toBe(200);
    const body = await res.json();

    if (body.isSuccess || body.IsSuccess) {
      qualificationId = body.result[0];
    } else {
      throw new Error(
        `Failed to add qualification: ${body.message || body.Message}`
      );
    }
  });

  // ─────────────────────────────────────────
  // GET BY ID
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Qualification By ID', async () => {
    const res = await qualifications.getById(qualificationId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // UPDATE
  // ─────────────────────────────────────────

  await assertStep(report, 'PUT Update Qualification', async () => {
    const res = await qualifications.updateQualification(
      {
        quId: qualificationId,
        quName: 'Updated Qualification',
        wfCode: 'UPD',
        errorMessage: 'Updated description'
      },
      token
    );

    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────

  await assertStep(report, 'DELETE Qualification', async () => {
    const res = await qualifications.deleteQualification(
      qualificationId,
      token
    );
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // TEMPLATE
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Download Template for Qualification', async () => {
    const res = await qualifications.downloadTemplate(token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});

