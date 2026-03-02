import { test, expect } from '../../fixtures/apifixture';
import { ChartOfAccountsAPI } from '../../api/community/chartofaccounts.c.api';
import { TestReporter, assertStep } from '../../utils/reporter';
import path from 'path';

let chartOfAccountId: string;
let detailSeqNo: number;

test('Chart of Accounts API Framework Tests', async ({ request, token }) => {
  const chartOfAccounts = new ChartOfAccountsAPI(request);
  const report = new TestReporter('Community › Chart of Accounts');
  const filePath = path.resolve('tests/assets/download.jpg');

  // ── Pre-cleanup ──────────────────────────────────────────
  const allRes = await chartOfAccounts.getAll(token);
  const allBody = await allRes.json();
  if (allBody.result) {
    for (const ca of allBody.result) {
      if (ca.caName === 'Playwright Test Chart of Account' ||
          ca.caName === 'Playwright Test Chart of Account Updated') {
        await chartOfAccounts.deleteChartOfAccount(ca.caId, token);
      }
    }
  }

  // ── Tests ────────────────────────────────────────────────
  await assertStep(report, 'GET All', async () => {
    const res = await chartOfAccounts.getAll(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'POST Create', async () => {
    const res = await chartOfAccounts.addChartOfAccount([{
      caNo: 0,
      caName: 'Playwright Test Chart of Account',
      caDesc: 'Created by Playwright automation',
      caType: 0,
      uploadFile: null,
      creDate: new Date().toISOString(),
      isHidden: true,
      logoCnt: 0,
      logoUrl: null,
      logoExtension: '.jpg'
    }], token);
    expect(res.status()).toBe(200);
    const body = await res.json();
    if (!body.isSuccess && !body.IsSuccess) throw new Error(body.message || body.Message);
    chartOfAccountId = body.result[0];
  });

  await assertStep(report, 'POST Upload Logo', async () => {
    const res = await chartOfAccounts.uploadLogo(chartOfAccountId, filePath, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Logo', async () => {
    const res = await chartOfAccounts.getLogo(chartOfAccountId, token);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.isSuccess).toBeTruthy();
    expect(body.result).toContain(chartOfAccountId);
  });

  await assertStep(report, 'POST Add Details', async () => {
    const res = await chartOfAccounts.addDetails(chartOfAccountId, [
      { caNo: 0, seqNo: 0, itemCode: 'TestCode1', itemDesc: 'Test Item 1' },
      { caNo: 0, seqNo: 0, itemCode: 'TestCode2', itemDesc: 'Test Item 2' }
    ], token);
    expect(res.status()).toBe(200);
    const body = await res.json();
    if (body.isSuccess && body.result?.length > 0) detailSeqNo = body.result[0];
  });

  await assertStep(report, 'PUT Update', async () => {
    const res = await chartOfAccounts.updateChartOfAccount({
      caNo: 0,
      caId: chartOfAccountId,
      caName: 'Playwright Test Chart of Account Updated',
      caDesc: 'Updated by Playwright automation',
      caType: 1,
      uploadFile: null,
      creDate: new Date().toISOString(),
      isHidden: false,
      logoCnt: 0,
      logoUrl: null,
      logoExtension: '.jpg'
    }, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PATCH Archive', async () => {
    const res = await chartOfAccounts.archiveChartOfAccount(chartOfAccountId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Archived', async () => {
    const res = await chartOfAccounts.getArchived(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PATCH Unarchive', async () => {
    const res = await chartOfAccounts.unarchiveChartOfAccount(chartOfAccountId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Details', async () => {
    const res = await chartOfAccounts.getDetails(chartOfAccountId, token);
    expect(res.status()).toBe(200);
    const body = await res.json();
    if (body.result?.length > 0) detailSeqNo = body.result[0].seqNo;
  });

  await assertStep(report, 'GET Details By No', async () => {
    const res = await chartOfAccounts.getDetailsByNo(chartOfAccountId, detailSeqNo, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Export Details', async () => {
    const res = await chartOfAccounts.exportDetails(chartOfAccountId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Template', async () => {
    const res = await chartOfAccounts.downloadTemplate(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'DELETE', async () => {
    const res = await chartOfAccounts.deleteChartOfAccount(chartOfAccountId, token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});

test.afterEach(async ({ request, token }) => {
  if (chartOfAccountId) {
    try {
      const chartOfAccounts = new ChartOfAccountsAPI(request);
      await chartOfAccounts.deleteChartOfAccount(chartOfAccountId, token);
    } catch {}
  }
});
