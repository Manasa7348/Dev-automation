import { test, expect } from '../../fixtures/apifixture';
import { PayBandAPI } from '../../api/community/payband.c.api';
import { TestReporter, assertStep } from '../../utils/reporter';
import path from 'path';

let pbId: string;

test('Pay Band API Framework Tests', async ({ request, token }) => {
  const payBand = new PayBandAPI(request, token);
  const report = new TestReporter('Community › PayBand');

  // ─────────────────────────────────────────
  // PRE-CLEANUP
  // ─────────────────────────────────────────

  await assertStep(report, 'Pre-cleanup Existing Pay Bands', async () => {
    const allRes = await payBand.getAll(token);
    const allBody = await allRes.json();

    if (allBody.result) {
      for (const pb of allBody.result) {
        if (pb.pbname === 'pb420' || pb.pbname === 'pb420 updated') {
          await payBand.deletePayBand(pb.pbid, token);
        }
      }
    }
  });

  // ─────────────────────────────────────────
  // PAY BAND CRUD
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Pay Bands', async () => {
    const res = await payBand.getAll(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'POST Add Pay Band', async () => {
    const res = await payBand.addPayBand(
      [
        {
          pbNo: 0,
          pbname: 'pb420',
          pbdesc: 'desc',
          pblogo: true,
          logo: true,
          logoCnt: 0,
          logoUrl: 'string',
          isHidden: true,
          creDate: '2026-02-26T10:00:23.273Z',
          uploadFile: 'string',
          logoExtension: '.jpg',
          points: [
            {
              pbNo: 0,
              ppid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              ppname: 'pp1',
              ppmin: 10,
              ppmax: 20,
              pbOrder: 0
            }
          ]
        }
      ],
      token
    );

    expect(res.status()).toBe(200);
    const body = await res.json();

    if (body.isSuccess || body.IsSuccess) {
      pbId = body.result[0];
    } else {
      throw new Error(`Failed to add pay band: ${body.message || body.Message}`);
    }
  });

  // ─────────────────────────────────────────
  // LOGO
  // ─────────────────────────────────────────

  const filePath = path.resolve('tests/assets/download.jpg');

  await assertStep(report, 'POST Upload Logo', async () => {
    const res = await payBand.uploadLogo(pbId, filePath);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Logo', async () => {
    const res = await payBand.getLogo(pbId);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // GET BY ID / UPDATE
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Pay Band By ID', async () => {
    const res = await payBand.getById(pbId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PUT Update Pay Band', async () => {
    const res = await payBand.updatePayBand(
      pbId,
      {
        pbNo: 0,
        pbid: pbId,
        pbname: 'pb420 updated',
        pbdesc: 's',
        pblogo: true,
        logo: true,
        logoCnt: 0,
        logoUrl: 'string',
        isHidden: true,
        creDate: '2026-02-26T10:09:13.768Z',
        uploadFile: 'string',
        logoExtension: '.jpg',
        points: [
          {
            pbNo: 0,
            ppid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            ppname: 's',
            ppmin: 20,
            ppmax: 30,
            pbOrder: 0
          }
        ]
      },
      token
    );

    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // ARCHIVE / UNARCHIVE
  // ─────────────────────────────────────────

  await assertStep(report, 'PATCH Archive Pay Band', async () => {
    const res = await payBand.archivePayBand(pbId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PATCH Unarchive Pay Band', async () => {
    const res = await payBand.unarchivePayBand(pbId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // TEMPLATE & EXPORT
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Download Template', async () => {
    const res = await payBand.downloadTemplate(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Export Pay Band', async () => {
    const res = await payBand.exportPayBand(pbId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────

  await assertStep(report, 'DELETE Pay Band', async () => {
    const res = await payBand.deletePayBand(pbId, token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});