import { test, expect } from '../../fixtures/apifixture';
import { GradesAPI } from '../../api/community/grade.c.api';
import { TestReporter, assertStep } from '../../utils/reporter';
import path from 'path';

let gradeId: string;
let detailPtId: string;
let detailPtName: string;

test('Grades API Framework Tests', async ({ request, token }) => {
  const grades = new GradesAPI(request, token);
  const report = new TestReporter('Community › Grades');
  const filePath = path.resolve('tests/assets/download.jpg');

  // ── Pre-cleanup ──────────────────────────────────────────
  const allRes = await grades.getAll(token);
  const allBody = await allRes.json();
  if (allBody.result) {
    for (const gr of allBody.result) {
      if (gr.gsName === 'grade420' || gr.gsName === 'grade420 updated ') {
        await grades.deleteGrade(gr.gsId, token);
      }
    }
  }

  // ── Tests ────────────────────────────────────────────────
  await assertStep(report, 'GET All', async () => {
    const res = await grades.getAll(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'POST Create', async () => {
    const res = await grades.addGrade([{
      gsName: 'grade420',
      gsDesc: 'desc',
      uploadFile: 'string',
      logo: true,
      isHidden: true,
      creDate: '2026-02-24T09:53:44.587Z',
      logoCnt: 0,
      logoExtension: '.jpg',
      logoUrl: 'string'
    }], token);
    expect(res.status()).toBe(200);
    const body = await res.json();
    if (!body.isSuccess && !body.IsSuccess) throw new Error(JSON.stringify(body));
    gradeId = body.result[0];
  });

  await assertStep(report, 'POST Upload Logo', async () => {
    const res = await grades.uploadLogo(gradeId, filePath);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Logo', async () => {
    const res = await grades.getLogo(gradeId);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET By ID', async () => {
    const res = await grades.getById(gradeId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PUT Update', async () => {
    const res = await grades.updateGrade(gradeId, {
      gsId: gradeId,
      gsName: 'grade420 updated ',
      gsDesc: 'desc',
      uploadFile: 'string',
      logo: true,
      isHidden: true,
      creDate: '2026-02-24T10:02:15.691Z',
      logoCnt: 0,
      logoExtension: '.jpg',
      logoUrl: 'string'
    }, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PATCH Archive', async () => {
    const res = await grades.archiveGrade(gradeId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Archived', async () => {
    const res = await grades.getArchived(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PATCH Unarchive', async () => {
    const res = await grades.unarchiveGrade(gradeId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'POST Add Details', async () => {
    detailPtName = 'g1';
    const res = await grades.addDetails(gradeId, [{
      gsNo: 0,
      gNo: 0,
      gname: detailPtName,
      gpoints: '10,20',
      wfcCode: 'LP',
      wfcCodeDisplay: 'Level Points',
      ordering: 1,
      creBy: 0,
      creDate: new Date().toISOString(),
      amdBy: 0,
      amdDate: new Date().toISOString(),
      validationError: ''
    }], token);
    expect(res.status()).toBe(200);
    const body = await res.json();
    detailPtId = body.result?.[0];
  });

  await assertStep(report, 'GET Details', async () => {
    const res = await grades.getDetails(gradeId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Details By ID', async () => {
    const res = await grades.getDetailsByName(gradeId, detailPtId.toString(), token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Export Details', async () => {
    const res = await grades.exportDetails(gradeId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Template', async () => {
    const res = await grades.downloadTemplate(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Export', async () => {
    const res = await grades.exportGrade(gradeId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'DELETE', async () => {
    const res = await grades.deleteGrade(gradeId, token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});