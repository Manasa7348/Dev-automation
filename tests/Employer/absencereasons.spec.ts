import { test, expect } from '../../fixtures/apifixture'
import { AbsenceCategoriesAPI } from '../../api/Employer/absencereasons.api'
import { TestReporter, assertStep } from '../../utils/reporter'

let sickCatgId: string
let leaveCatgId: string
let sickReasonNo: number
let leaveReasonNo: number

test('Absence Categories API Framework Tests', async ({ request, token }) => {
  const api = new AbsenceCategoriesAPI(request)
  const report = new TestReporter('Employer › Absence Categories')

  // ─────────────────────────────────────────
  // GET ALL & TEMPLATE
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Absence Categories', async () => {
    const res = await api.getAll(token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'GET Download Template', async () => {
    const res = await api.getTemplate(token)
    expect(res.status()).toBe(200)
  })

  // ─────────────────────────────────────────
  // SICKNESS CATEGORY (absCatgKind: 1)
  // ─────────────────────────────────────────

  await assertStep(report, 'POST Create Sickness Category', async () => {
    const res = await api.create([{
      absCatgName: `playwright sickness ${Date.now()}`,
      absCatgKind: 1,
      absenceReasons: []
    }], token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
    sickCatgId = body.result[0]
  })

  await assertStep(report, 'GET Sickness Category By ID', async () => {
    const res = await api.getById(sickCatgId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'PUT Update Sickness Category', async () => {
    const res = await api.update(sickCatgId, {
      absCatgId: sickCatgId,
      absCatgName: `playwright sickness updated ${Date.now()}`,
      absCatgKind: 1,
      absenceReasons: []
    }, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
  })

  await assertStep(report, 'GET All Sickness Reasons', async () => {
    const res = await api.getReasons(sickCatgId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'POST Create Sickness Reason', async () => {
    const res = await api.createReason(sickCatgId, [{
      reasonNo: 0,
      reasonName: `playwright sick reason ${Date.now()}`,
      resetWhen: null,
      resetValue: null,
      paidAllowance: 3,
      allowanceDays: 0,
      allowApp: true,
      triggerInc: false
    }], token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
    sickReasonNo = body.result[0]
  })

  await assertStep(report, 'GET Sickness Reason By ID', async () => {
    const res = await api.getReasonById(sickCatgId, sickReasonNo, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'PUT Update Sickness Reason', async () => {
    const res = await api.updateReason(sickCatgId, sickReasonNo, {
      reasonNo: sickReasonNo,
      reasonName: `playwright sick reason updated ${Date.now()}`,
      resetWhen: 2,
      resetValue: 10,
      paidAllowance: 1,
      allowanceDays: 20,
      allowApp: false,
      triggerInc: true
    }, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
  })

  await assertStep(report, 'DELETE Sickness Reason', async () => {
    const res = await api.deleteReason(sickCatgId, sickReasonNo, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
    sickReasonNo = undefined as any
  })

  await assertStep(report, 'DELETE Sickness Category', async () => {
    const res = await api.delete(sickCatgId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
    sickCatgId = undefined as any
  })

  // ─────────────────────────────────────────
  // LEAVE CATEGORY (absCatgKind: 2)
  // ─────────────────────────────────────────

  await assertStep(report, 'POST Create Leave Category', async () => {
    const res = await api.create([{
      absCatgName: `playwright leave ${Date.now()}`,
      absCatgKind: 2,
      absenceReasons: []
    }], token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
    leaveCatgId = body.result[0]
  })

  await assertStep(report, 'GET Leave Category By ID', async () => {
    const res = await api.getById(leaveCatgId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'PUT Update Leave Category', async () => {
    const res = await api.update(leaveCatgId, {
      absCatgId: leaveCatgId,
      absCatgName: `playwright leave updated ${Date.now()}`,
      absCatgKind: 2,
      absenceReasons: []
    }, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
  })

  await assertStep(report, 'GET All Leave Reasons', async () => {
    const res = await api.getReasons(leaveCatgId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'POST Create Leave Reason', async () => {
    const res = await api.createReason(leaveCatgId, [{
      reasonNo: 0,
      reasonName: `playwright leave reason ${Date.now()}`,
      resetWhen: 1,
      resetValue: 5,
      paidAllowance: 1,
      allowanceDays: 10,
      allowApp: false,
      triggerInc: true
    }], token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
    leaveReasonNo = body.result[0]
  })

  await assertStep(report, 'GET Leave Reason By ID', async () => {
    const res = await api.getReasonById(leaveCatgId, leaveReasonNo, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'PUT Update Leave Reason', async () => {
    const res = await api.updateReason(leaveCatgId, leaveReasonNo, {
      reasonNo: leaveReasonNo,
      reasonName: `playwright leave reason updated ${Date.now()}`,
      resetWhen: 2,
      resetValue: 10,
      paidAllowance: 1,
      allowanceDays: 20,
      allowApp: false,
      triggerInc: true
    }, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
  })

  await assertStep(report, 'DELETE Leave Reason', async () => {
    const res = await api.deleteReason(leaveCatgId, leaveReasonNo, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
    leaveReasonNo = undefined as any
  })

  await assertStep(report, 'DELETE Leave Category', async () => {
    const res = await api.delete(leaveCatgId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
    leaveCatgId = undefined as any
  })

  report.summary()
})

test.afterEach(async ({ request, token }) => {
  const api = new AbsenceCategoriesAPI(request)
  try {
    if (sickReasonNo && sickCatgId) {
      await api.deleteReason(sickCatgId, sickReasonNo, token)
      sickReasonNo = undefined as any
    }
  } catch {}
  try {
    if (sickCatgId) {
      await api.delete(sickCatgId, token)
      sickCatgId = undefined as any
    }
  } catch {}
  try {
    if (leaveReasonNo && leaveCatgId) {
      await api.deleteReason(leaveCatgId, leaveReasonNo, token)
      leaveReasonNo = undefined as any
    }
  } catch {}
  try {
    if (leaveCatgId) {
      await api.delete(leaveCatgId, token)
      leaveCatgId = undefined as any
    }
  } catch {}
})