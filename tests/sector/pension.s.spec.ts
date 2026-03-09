import { test, expect } from '../../fixtures/apifixture'
import { PensionAPI } from '../../api/sector/pension.s.api'
import { TestReporter, assertStep } from '../../utils/reporter'
import { checkDuplicateBeforeCreate } from '../../api/helpers/duplicate'
import * as path from 'path'

let pfId: string
let rtId: string
let acId: string
let docId: string

test('Pension API Framework Tests', async ({ request, token }) => {
  const pension = new PensionAPI(request, token)
  const report = new TestReporter('Sector › Pension')

  // ─────────────────────────────────────────
  // RATE TABLE CRUD
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Rate Tables', async () => {
    const res = await pension.getAllRateTables(token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'GET Rate Table Lookup', async () => {
    const res = await pension.getRateTableLookup(token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'POST Add Rate Table', async () => {
    const payload = {
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
    }

    await checkDuplicateBeforeCreate(pension, token, payload, 'rtName')

    const res = await pension.addRateTable(payload, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess && !body.IsSuccess) throw new Error(body.message || body.Message)
    rtId = body.result
  })

  await assertStep(report, 'GET Rate Table By ID', async () => {
    const res = await pension.getRateTableById(rtId, token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'GET Rate Table Bands', async () => {
    const res = await pension.getRateTableBands(rtId, '2026/02/01', token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'PUT Add Rate Table Date', async () => {
    const res = await pension.addRateTableDate(rtId, {
      effectiveDate: '2026-03-01',
      creDate: new Date().toISOString(),
      pensionRateBands: [{ earnMin: 80, earnMax: 90, value: 70 }]
    }, token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'PUT Rename Rate Table', async () => {
    const res = await pension.renameRateTable(rtId, 'rate table 420', token)
    expect(res.status()).toBe(200)
  })

  // ─────────────────────────────────────────
  // PENSION FUND CRUD
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Pension Funds', async () => {
    const res = await pension.getAll(token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'POST Add Pension Fund', async () => {
    const payload = {
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
    }

    await checkDuplicateBeforeCreate(pension, token, payload, 'fundName')

    const res = await pension.addPension(payload, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess && !body.IsSuccess) throw new Error(body.message || body.Message)
    pfId = body.result
  })

  await assertStep(report, 'GET Pension Fund By ID', async () => {
    const res = await pension.getById(pfId, token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'PUT Update Pension Fund', async () => {
    const res = await pension.updatePension(pfId, {
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
    }, token)
    expect(res.status()).toBe(200)
  })

  // ─────────────────────────────────────────
  // GUIDANCE DOCUMENTS
  // ─────────────────────────────────────────

  await assertStep(report, 'POST Upload Guidance Document', async () => {
    const filePath = path.resolve(__dirname, '../../fixtures/HolidayCalculationData_20260306_130553.xlsx')
    const res = await pension.uploadFundDocument(pfId, filePath, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess && !body.IsSuccess) throw new Error(body.message || body.Message)
    docId = body.result.docId
  })

  await assertStep(report, 'GET All Guidance Documents', async () => {
    const res = await pension.getGuidanceDocuments(pfId, token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'GET Guidance Document By ID', async () => {
    const res = await pension.getGuidanceDocumentById(pfId, docId, token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'GET Download Guidance Document', async () => {
    const res = await pension.downloadGuidanceDocument(pfId, docId, token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'DELETE Guidance Document', async () => {
    const res = await pension.deleteFundDocument(pfId, docId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess && !body.IsSuccess) throw new Error(body.message || body.Message)
    docId = undefined as any
  })

  // ─────────────────────────────────────────
  // ADDITIONAL CONTRIBUTIONS
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Additional Contributions', async () => {
    const res = await pension.getAllAdditionalContributions(token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'POST Add Additional Contribution', async () => {
    const payload = {
      acName: 'p420',
      thirdPartyReq: true,
      creDate: new Date().toISOString()
    }

    await checkDuplicateBeforeCreate(pension, token, payload, 'acName')

    const res = await pension.addAdditionalContribution(payload, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess && !body.IsSuccess) throw new Error(body.message || body.Message)
    acId = body.result
  })

  await assertStep(report, 'GET Additional Contribution By ID', async () => {
    const res = await pension.getAdditionalContributionById(acId, token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'PUT Update Additional Contribution', async () => {
    const res = await pension.updateAdditionalContribution(acId, {
      acId: acId,
      acName: 'p420 update',
      thirdPartyReq: false,
      creDate: new Date().toISOString()
    }, token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'DELETE Additional Contribution', async () => {
    const res = await pension.deleteAdditionalContribution(acId, token)
    expect(res.status()).toBe(200)
  })



  // ─────────────────────────────────────────
  // CLEANUP
  // ─────────────────────────────────────────

  await assertStep(report, 'DELETE Rate Table Date', async () => {
    const res = await pension.deleteRateTableDate(rtId, '2026/03/01', token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'DELETE Rate Table', async () => {
    const res = await pension.deleteRateTable(rtId, token)
    expect(res.status()).toBe(200)
  })

  report.summary()
})

test.afterEach(async ({ request, token }) => {
  const pension = new PensionAPI(request, token)

  try {
    if (docId) {
      await pension.deleteFundDocument(pfId, docId, token)
      docId = undefined as any
    }

    if (pfId) {
      await pension.deletePension(pfId, token)
      pfId = undefined as any
    }

    if (acId) {
      await pension.deleteAdditionalContribution(acId, token)
      acId = undefined as any
    }

    if (rtId) {
      try {
        await pension.deleteRateTableDate(rtId, '2026/03/01', token)
      } catch {}
      await pension.deleteRateTable(rtId, token)
      rtId = undefined as any
    }
  } catch (error) {
    console.log('Cleanup failed:', error)
  }
})