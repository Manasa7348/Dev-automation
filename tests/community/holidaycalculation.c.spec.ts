import { test, expect } from '../../fixtures/apifixture';
import { TermTimeOnlyAPI } from '../../api/community/holiday.c.api';
import { TestReporter, assertStep } from '../../utils/reporter';
import path from 'path';

let ttId: string;

test('Term Time Only API Framework Tests', async ({ request, token }) => {
  const termTime = new TermTimeOnlyAPI(request, token);
  const report = new TestReporter('Community › HolidayCalculation');

  // ─────────────────────────────────────────
  // PRE-CLEANUP
  // ─────────────────────────────────────────

  await assertStep(report, 'Pre-cleanup Existing Records', async () => {
    const allRes = await termTime.getAll(token);
    const allBody = await allRes.json();

    if (allBody.result) {
      for (const tt of allBody.result) {
        if (tt.ttName === 'Automation TTO' || tt.ttName === 'Updated Automation TTO') {
          await termTime.delete(tt.ttId, token);
        }
      }
    }
  });

  // ─────────────────────────────────────────
  // TERM TIME ONLY CRUD
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Term Time Only', async () => {
    const res = await termTime.getAll(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'POST Create Term Time Only', async () => {
    const res = await termTime.create(
      {
        ttName: 'Automation TTO',
        ttDesc: 'Created via API',
        logoExtension: '.jpg',
        termTimeThresholds: [
          {
            threshold: 10,
            commTermTimeOnlyGrades: [
              {
                gradeName: 'Grade A',
                commTermTimeOnlyValues: [
                  {
                    worked: 10,
                    paid: 8
                  }
                ],
                commTermTimeOnlyPtOverrideDtos: [
                  {
                    worked: 10,
                    ptName: 'p1',
                    paid: 12
                  }
                ]
              }
            ]
          }
        ]
      },
      token
    );

    expect(res.status()).toBe(200);
    const body = await res.json();

    if (body.isSuccess || body.IsSuccess) {
      ttId = body.result;
    } else {
      throw new Error(`Failed to create term time only: ${body.message || body.Message}`);
    }
  });

  // ─────────────────────────────────────────
  // LOGO
  // ─────────────────────────────────────────

  const filePath = path.resolve('tests/assets/download.jpg');

  await assertStep(report, 'POST Upload Logo', async () => {
    const res = await termTime.uploadLogo(ttId, filePath);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Logo', async () => {
    const res = await termTime.getLogo(ttId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // GET BY ID / UPDATE
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Term Time Only By ID', async () => {
    const res = await termTime.getById(ttId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PUT Update Term Time Only', async () => {
    const res = await termTime.update(
      ttId,
      {
        ttId: ttId,
        ttName: 'Updated Automation TTO',
        ttDesc: 'Updated desc',
        logoExtension: '.jpg'
      },
      token
    );

    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // ARCHIVE / UNARCHIVE
  // ─────────────────────────────────────────

  await assertStep(report, 'PATCH Archive Term Time Only', async () => {
    const res = await termTime.archiveTermTime(ttId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PATCH Unarchive Term Time Only', async () => {
    const res = await termTime.unarchiveTermTime(ttId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // DETAILS & CARDS
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Term Time Only Details', async () => {
    const res = await termTime.getDetails(ttId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Term Time Only Cards', async () => {
    const res = await termTime.getCards(token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────

  await assertStep(report, 'DELETE Term Time Only', async () => {
    const res = await termTime.delete(ttId, token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});

test.afterEach(async ({ request, token }) => {
  if (ttId) {
    try {
      const termTime = new TermTimeOnlyAPI(request, token);
      await termTime.delete(ttId, token);
      ttId = undefined as any; // reset
    } catch (error) {
      console.log('Cleanup failed:', error);
    }
  }
});