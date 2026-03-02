import { test, expect } from '../../fixtures/apifixture';
import { PensionAPI } from '../../api/sector/pension.s.api';
import { TestReporter, assertStep } from '../../utils/reporter';

let pfId: string;
let rtId: string;
let acId: string;

test('Pension API Framework Tests', async ({ request, token }) => {
  const pension = new PensionAPI(request, token);
  const report = new TestReporter('Sector › Pension');

  // ─────────────────────────────────────────
  // PRE-CLEANUP
  // ─────────────────────────────────────────

  await assertStep(report, 'Pre-cleanup Pension Funds', async () => {
    const res = await pension.getAll(token);
    const body = await res.json();

    if (body.result) {
      for (const pf of body.result) {
        if (pf.fundName === 'p420' || pf.fundName === 'p420 updateds') {
          await pension.deletePension(pf.pfId, token);
        }
      }
    }
  });

  await assertStep(report, 'Pre-cleanup Rate Tables', async () => {
    const res = await pension.getAllRateTables(token);
    const body = await res.json();

    if (body.result) {
      for (const rt of body.result) {
        if (rt.rtName === 'rate table1' || rt.rtName === 'rate table 420') {
          await pension.deleteRateTable(rt.rtId, token);
        }
      }
    }
  });

  await assertStep(report, 'Pre-cleanup Additional Contributions', async () => {
    const res = await pension.getAllAdditionalContributions(token);
    const body = await res.json();

    if (body.result) {
      for (const ac of body.result) {
        if (ac.acName === 'p420' || ac.acName === 'p420 update') {
          await pension.deleteAdditionalContribution(ac.acId, token);
        }
      }
    }
  });

  // ─────────────────────────────────────────
  // RATE TABLE CRUD
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Rate Tables', async () => {
    const res = await pension.getAllRateTables(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Rate Table Lookup', async () => {
    const res = await pension.getRateTableLookup(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'POST Add Rate Table', async () => {
    const res = await pension.addRateTable(
      {
        rtName: 'rate table1',
        isPercentage: true,
        creDate: new Date().toISOString(),
        pensionRateTableDates: [
          {
            effectiveDate: '2026-02-01',
            creDate: new Date().toISOString(),
            pensionRateBands: [
              { earnMin: 10, earnMax: 20, value: 30 },
              { earnMin: 20, earnMax: 30, value: 40 }
            ]
          }
        ]
      },
      token
    );

    expect(res.status()).toBe(200);
    const body = await res.json();

    if (body.isSuccess || body.IsSuccess) {
      rtId = body.result;
    } else {
      throw new Error(`Failed to add rate table: ${body.message || body.Message}`);
    }
  });

  await assertStep(report, 'GET Rate Table By ID', async () => {
    const res = await pension.getRateTableById(rtId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Rate Table Bands', async () => {
    const res = await pension.getRateTableBands(rtId, '2026/02/01', token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PUT Add Rate Table Date', async () => {
    const res = await pension.addRateTableDate(
      rtId,
      {
        effectiveDate: '2026-03-01',
        creDate: new Date().toISOString(),
        pensionRateBands: [{ earnMin: 80, earnMax: 90, value: 70 }]
      },
      token
    );

    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PUT Rename Rate Table', async () => {
    const res = await pension.renameRateTable(rtId, 'rate table 420', token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // PENSION FUND CRUD
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Pension Funds', async () => {
    const res = await pension.getAll(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'POST Add Pension Fund', async () => {
    const res = await pension.addPension(
      {
        fundName: 'p420',
        fundType: 1,
        hide: false,
        schemeType: 1,
        isQualifying: true,
        contractualEnroll: false,
        allow5050: true,
        portalSite: 'example.com',
        pensionAdministrator: 'asdf',
        portalUsername: 'mani',
        portalPwd: '7389',
        bankAccName: 'canara',
        bankAccNo: '67878912',
        sortCode: '506326',
        pdMethod: 1,
        pdValue: 7,
        bdMethod: 1,
        bdValue: 10,
        mdMethod: 1,
        mdValue: 28,
        annualDeadline: '2027-02-27',
        contactEmail: 'man@gmail.com',
        contactNo: '7348978427',
        rateTable: 'string',
        rtId: rtId,
        pensionFundGuidances: []
      },
      token
    );

    expect(res.status()).toBe(200);
    const body = await res.json();

    if (body.isSuccess || body.IsSuccess) {
      pfId = body.result;
    } else {
      throw new Error(`Failed to add pension fund: ${body.message || body.Message}`);
    }
  });

  await assertStep(report, 'GET Pension Fund By ID', async () => {
    const res = await pension.getById(pfId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PUT Update Pension Fund', async () => {
    const res = await pension.updatePension(
      pfId,
      {
        pfId: pfId,
        fundName: 'p420 updateds',
        fundType: 1,
        hide: false,
        schemeType: 1,
        isQualifying: false,
        contractualEnroll: true,
        allow5050: false,
        portalSite: '',
        pensionAdministrator: 'st',
        portalUsername: 's',
        portalPwd: '12',
        bankAccName: 'axis',
        bankAccNo: '34389974',
        sortCode: '414613',
        pdMethod: 2,
        pdValue: 31,
        bdMethod: 1,
        bdValue: 12,
        mdMethod: 1,
        mdValue: 2,
        annualDeadline: '2026-05-27',
        contactEmail: 'man@gmail.com',
        contactNo: '872283074',
        rateTable: 'string',
        rtId: rtId,
        pensionFundGuidances: []
      },
      token
    );

    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // ADDITIONAL CONTRIBUTIONS
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Additional Contributions', async () => {
    const res = await pension.getAllAdditionalContributions(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'POST Add Additional Contribution', async () => {
    const res = await pension.addAdditionalContribution(
      {
        acName: 'p420',
        thirdPartyReq: true,
        creDate: new Date().toISOString()
      },
      token
    );

    expect(res.status()).toBe(200);
    const body = await res.json();

    if (body.isSuccess || body.IsSuccess) {
      acId = body.result;
    } else {
      throw new Error(
        `Failed to add additional contribution: ${body.message || body.Message}`
      );
    }
  });

  await assertStep(report, 'GET Additional Contribution By ID', async () => {
    const res = await pension.getAdditionalContributionById(acId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PUT Update Additional Contribution', async () => {
    const res = await pension.updateAdditionalContribution(
      acId,
      {
        acId: acId,
        acName: 'p420 update',
        thirdPartyReq: false,
        creDate: new Date().toISOString()
      },
      token
    );

    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'DELETE Additional Contribution', async () => {
    const res = await pension.deleteAdditionalContribution(acId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // CLEANUP RATE TABLE
  // ─────────────────────────────────────────

  await assertStep(report, 'DELETE Rate Table Date', async () => {
    const res = await pension.deleteRateTableDate(rtId, '2026/03/01', token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'DELETE Rate Table', async () => {
    const res = await pension.deleteRateTable(rtId, token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});