import { test, expect } from '../../fixtures/apifixture';
import { PayScalesAPI } from '../../api/community/payscale.c.api';
import { TestReporter, assertStep } from '../../utils/reporter';
import path from 'path';

let payscaleId: string;
let detailPtId: string;
let detailPtName: string;

test('Pay Scales API Framework Tests', async ({ request, token }) => {
  const payscales = new PayScalesAPI(request, token);
  const report = new TestReporter('Community › PayScale');

  // ─────────────────────────────────────────
  // PRE-CLEANUP
  // ─────────────────────────────────────────

  await assertStep(report, 'Pre-cleanup Existing Pay Scales', async () => {
    const allRes = await payscales.getAll(token);
    const allBody = await allRes.json();

    if (allBody.result) {
      for (const ps of allBody.result) {
        if (ps.psName === 'ps420' || ps.psName === 'ps420 updated ') {
          await payscales.deletePayScale(ps.psId, token);
        }
      }
    }
  });

  // ─────────────────────────────────────────
  // PAY SCALE CRUD
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Pay Scales', async () => {
    const res = await payscales.getAll(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'POST Add Pay Scale', async () => {
    const res = await payscales.addPayScale(
      [
        {
          psName: 'ps420',
          psDesc: 'desc',
          uploadFile: 'string',
          logo: true,
          isHidden: true,
          creDate: '2026-02-24T09:53:44.587Z',
          logoCnt: 0,
          logoExtension: '.jpg',
          logoUrl: 'string'
        }
      ],
      token
    );

    expect(res.status()).toBe(200);
    const body = await res.json();

    if (body.isSuccess || body.IsSuccess) {
      payscaleId = body.result[0];
    } else {
      throw new Error(`Failed to add pay scale: ${body.message || body.Message}`);
    }
  });

  // ─────────────────────────────────────────
  // LOGO
  // ─────────────────────────────────────────

  const filePath = path.resolve('tests/assets/download.jpg');

  await assertStep(report, 'POST Upload Logo', async () => {
    const res = await payscales.uploadLogo(payscaleId, filePath);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Logo', async () => {
    const res = await payscales.getLogo(payscaleId);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // GET BY ID / UPDATE
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Pay Scale By ID', async () => {
    const res = await payscales.getById(payscaleId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PUT Update Pay Scale', async () => {
    const res = await payscales.updatePayScale(
      {
        psId: payscaleId,
        psName: 'ps420 updated ',
        psDesc: 'desc',
        uploadFile: 'string',
        logo: true,
        isHidden: true,
        creDate: '2026-02-24T10:02:15.691Z',
        logoCnt: 0,
        logoExtension: '.jpg',
        logoUrl: 'string'
      },
      token
    );

    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // ARCHIVE / UNARCHIVE
  // ─────────────────────────────────────────

  await assertStep(report, 'PATCH Archive Pay Scale', async () => {
    const res = await payscales.archivePayScale(payscaleId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Archived Pay Scales', async () => {
    const res = await payscales.getArchived(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PATCH Unarchive Pay Scale', async () => {
    const res = await payscales.unarchivePayScale(payscaleId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // PAY SCALE DETAILS
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Pay Scale Details', async () => {
    const res = await payscales.getDetails(payscaleId, token);
    expect(res.status()).toBe(200);
  });

  detailPtName = 'TestPoint1';

  await assertStep(report, 'POST Add Pay Scale Details', async () => {
    const res = await payscales.addDetails(
      payscaleId,
      [
        {
          psNo: 1,
          ptName: detailPtName,
          ptOrder: 1,
          ptValue: 100,
          validationError: '',
          pk: 0,
          rowNumber: 1,
          error: ''
        }
      ],
      token
    );

    expect(res.status()).toBe(200);
    const body = await res.json();

    if (body.isSuccess || body.IsSuccess) {
      detailPtId =
        body.result?.[0]?.ptId ||
        body.result?.[0]?.psNo?.toString();
    } else {
      throw new Error(`Failed to add details: ${body.message || body.Message}`);
    }
  });

  await assertStep(report, 'GET Pay Scale Details By Name', async () => {
    const res = await payscales.getDetailsByName(payscaleId, detailPtName, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Export Pay Scale Details', async () => {
    const res = await payscales.exportDetails(payscaleId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // TEMPLATE & EXPORT
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Download Template', async () => {
    const res = await payscales.downloadTemplate(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Export Pay Scale', async () => {
    const res = await payscales.exportPayScale(payscaleId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────

  await assertStep(report, 'DELETE Pay Scale', async () => {
    const res = await payscales.deletePayScale(payscaleId, token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});

test.afterEach(async ({ request, token }) => {
  if (payscaleId) {
    try {
      const payscales = new PayScalesAPI(request, token);
      await payscales.deletePayScale(payscaleId, token);
      payscaleId = undefined as any; // reset
    } catch (error) {
      console.log('Cleanup failed:', error);
    }
  }
});