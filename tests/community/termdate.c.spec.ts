import { test, expect } from '../../fixtures/apifixture';
import { TermDateSetAPI } from '../../api/community/termdate.c.api';
import { TestReporter, assertStep } from '../../utils/reporter';
import path from 'path';

let tgId: string;
let tdId: string;

test('Term Date Set API Framework Tests', async ({ request, token }) => {
  const termDateSet = new TermDateSetAPI(request, token);
  const report = new TestReporter('Community › TermDateSet');

  // ─────────────────────────────────────────
  // PRE-CLEANUP
  // ─────────────────────────────────────────

  await assertStep(report, 'Pre-cleanup Existing Term Date Sets', async () => {
    const allRes = await termDateSet.getAll(token);
    const allBody = await allRes.json();

    if (allBody.result) {
      for (const tg of allBody.result) {
        if (tg.tgName === 'tt420' || tg.tgName === 'tt420 updated') {
          await termDateSet.deleteTermDateSet(tg.tgId, token);
        }
      }
    }
  });

  // ─────────────────────────────────────────
  // CRUD
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Term Date Sets', async () => {
    const res = await termDateSet.getAll(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'POST Add Term Date Set', async () => {
    const res = await termDateSet.addTermDateSet(
      [
        {
          tgName: 'tt420',
          tgDesc: 'desc',
          region: 'SCT',
          uploadFile: 'string',
          logoCnt: 0,
          logoUrl: 'string',
          isHidden: true,
          logoExtension: '.jpg',
          creBy: 0,
          creDate: '2026-02-26T08:52:14.945Z',
          amdBy: 0,
          amdDate: '2026-02-26T08:52:14.945Z'
        }
      ],
      token
    );

    expect(res.status()).toBe(200);
    const body = await res.json();

    if (body.isSuccess || body.IsSuccess) {
      tgId = body.result[0];
    } else {
      throw new Error(
        `Failed to add term date set: ${body.message || body.Message}`
      );
    }
  });

  // ─────────────────────────────────────────
  // LOGO
  // ─────────────────────────────────────────

  const filePath = path.resolve('tests/assets/download.jpg');

  await assertStep(report, 'POST Upload Logo', async () => {
    const res = await termDateSet.uploadLogo(tgId, filePath);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Logo', async () => {
    const res = await termDateSet.getLogo(tgId);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // GET BY ID / UPDATE
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Term Date Set By ID', async () => {
    const res = await termDateSet.getById(tgId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PUT Update Term Date Set', async () => {
    const res = await termDateSet.updateTermDateSet(
      tgId,
      {
        tgId: tgId,
        tgName: 'tt420 updated',
        tgDesc: 'desc',
        region: 'ENG',
        uploadFile: 'string',
        logoCnt: 0,
        logoUrl: 'string',
        isHidden: false,
        logoExtension: '.jpg',
        creBy: 0,
        creDate: '2026-02-26T09:29:39.114Z',
        amdBy: 0,
        amdDate: '2026-02-26T09:29:39.114Z'
      },
      token
    );

    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // ARCHIVE / UNARCHIVE
  // ─────────────────────────────────────────

  await assertStep(report, 'PATCH Archive Term Date Set', async () => {
    const res = await termDateSet.archiveTermDateSet(tgId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Archived Term Date Sets', async () => {
    const res = await termDateSet.getArchived(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PATCH Unarchive Term Date Set', async () => {
    const res = await termDateSet.unarchiveTermDateSet(tgId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // TEMPLATE
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Download Template', async () => {
    const res = await termDateSet.downloadTemplate(token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // TERM DATE ENTRIES
  // ─────────────────────────────────────────

  await assertStep(report, 'POST Add Term Dates', async () => {
    const res = await termDateSet.addTermDates(
      tgId,
      [
        {
          tgId: tgId,
          dateFrom: '2026-02-21',
          dateTo: '2026-03-01',
          description: 'holiS',
          termName: 'Spring',
          kind: 'Open',
          kindName: 'string',
          termDisplayName: 'string'
        }
      ],
      token
    );

    expect(res.status()).toBe(200);
    const body = await res.json();

    if (body.isSuccess || body.IsSuccess) {
      tdId = body.result[0];
    } else {
      throw new Error(
        `Failed to add term dates: ${body.message || body.Message}`
      );
    }
  });

  await assertStep(report, 'GET Term Dates', async () => {
    const res = await termDateSet.getTermDates(tgId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Export Term Dates', async () => {
    const res = await termDateSet.exportTermDates(tgId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────

  await assertStep(report, 'DELETE Term Date Set', async () => {
    const res = await termDateSet.deleteTermDateSet(tgId, token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});