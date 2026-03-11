import { test, expect } from '../../fixtures/apifixture'
import { EmployerCodesAPI } from '../../api/Employer/chart of accounts.api'
import { TestReporter, assertStep } from '../../utils/reporter'

const TS = Date.now()
const LEDGER_CODE = `playwright ledger ${TS}`
const COST_CODE = `playwright cost centre ${TS}`
const FUND_CODE = `playwright fund ${TS}`

let legId: string
let cosId: string
let funId: string

test('Employer Codes API Framework Tests', async ({ request, token }) => {
  const api = new EmployerCodesAPI(request)
  const report = new TestReporter('Employer › Codes')

  // ─────────────────────────────────────────
  // LEDGER CODES
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Ledger Codes', async () => {
    const res = await api.getLedgerCodes(token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'GET Download Ledger Template', async () => {
    const res = await api.downloadLedgerTemplate(token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'POST Create Ledger Code', async () => {
    const res = await api.createLedgerCode([{ legCode: LEDGER_CODE, legDesc: 'playwright desc' }], token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)

    const allRes = await api.getLedgerCodes(token)
    const allBody = await allRes.json()
    const found = allBody.result?.find((i: any) => i.legCode === LEDGER_CODE)
    if (!found) throw new Error(`Ledger code "${LEDGER_CODE}" not found after create`)
    legId = found.legId
  })

  await assertStep(report, 'GET Ledger Code By ID', async () => {
    const res = await api.getLedgerCodeById(legId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'PUT Update Ledger Code', async () => {
    const res = await api.updateLedgerCode({
      legId, legNo: 0, legCode: LEDGER_CODE, legDesc: 'updated desc'
    }, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
  })

  await assertStep(report, 'DELETE Ledger Code', async () => {
    const res = await api.deleteLedgerCode([legId], token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
    legId = undefined as any
  })

  // ─────────────────────────────────────────
  // COST CENTRE
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Cost Centres', async () => {
    const res = await api.getCostCentres(token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'POST Create Cost Centre', async () => {
    const res = await api.createCostCentre([{
      cosCode: COST_CODE,
      cosDesc: 'playwright desc',
      employerId: '9a694b9b-74aa-4917-81b4-ae47dfdb7fff'
    }], token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)

    const allRes = await api.getCostCentres(token)
    const allBody = await allRes.json()
    const found = allBody.result?.find((i: any) => i.cosCode === COST_CODE)
    if (!found) throw new Error(`Cost centre "${COST_CODE}" not found after create`)
    cosId = found.cosId
  })

  await assertStep(report, 'GET Cost Centre By ID', async () => {
    const res = await api.getCostCentreById(cosId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'PUT Update Cost Centre', async () => {
    const res = await api.updateCostCentre({
      cosId, cosNo: 0, cosCode: COST_CODE, cosDesc: 'updated desc',
      employerId: '9a694b9b-74aa-4917-81b4-ae47dfdb7fff', erNo: 0
    }, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
  })

  await assertStep(report, 'DELETE Cost Centre', async () => {
    const res = await api.deleteCostCentre(cosId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
    cosId = undefined as any
  })

  // ─────────────────────────────────────────
  // FUND CODES
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Fund Codes', async () => {
    const res = await api.getFundCodes(token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'POST Create Fund Code', async () => {
    const res = await api.createFundCode([{ funCode: FUND_CODE, funDesc: 'playwright desc' }], token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)

    const allRes = await api.getFundCodes(token)
    const allBody = await allRes.json()
    const found = allBody.result?.find((i: any) => i.funCode === FUND_CODE)
    if (!found) throw new Error(`Fund code "${FUND_CODE}" not found after create`)
    funId = found.funId
  })

  await assertStep(report, 'GET Fund Code By ID', async () => {
    const res = await api.getFundCodeById(funId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'PUT Update Fund Code', async () => {
    const res = await api.updateFundCode({
      funId, funNo: 0, funCode: FUND_CODE, funDesc: 'updated desc'
    }, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
  })

  await assertStep(report, 'DELETE Fund Code', async () => {
    const res = await api.deleteFundCode([funId], token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
    funId = undefined as any
  })

  report.summary()
})

// cleans up any records left in DB if test fails mid-run ──
test.afterEach(async ({ request, token }) => {
  const api = new EmployerCodesAPI(request)
  try { if (legId) await api.deleteLedgerCode([legId], token) } catch {}
  try { if (cosId) await api.deleteCostCentre(cosId, token) } catch {}
  try { if (funId) await api.deleteFundCode([funId], token) } catch {}
  legId = undefined as any
  cosId = undefined as any
  funId = undefined as any
})