import { test, expect } from '../../fixtures/apifixture'
import { TermDatesAPI } from '../../api/Employer/termdates.api'
import { TestReporter, assertStep } from '../../utils/reporter'

let tdGroupId: string
let tdId: string

const GROUP_NAME = `playwright termdate ${Date.now()}`

test('Term Dates API Framework Tests', async ({ request, token }) => {
  const api = new TermDatesAPI(request)
  const report = new TestReporter('Employer › Term Dates')

  // ─────────────────────────────────────────
  // TERM DATE GROUP
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Groups', async () => {
    const res = await api.getAllGroups(token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'POST Create Group', async () => {
    const res = await api.createGroup({ tdGroupName: GROUP_NAME }, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
    tdGroupId = body.result
  })

  await assertStep(report, 'GET Group By ID', async () => {
    const res = await api.getGroupById(tdGroupId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'PUT Update Group', async () => {
    const res = await api.updateGroup(tdGroupId, {
      tdGroupId: tdGroupId,
      tdGroupName: `${GROUP_NAME} updated`
    }, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
  })

  // ─────────────────────────────────────────
  // TERM DATES
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Dates', async () => {
    const res = await api.getAllDates(tdGroupId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'POST Create Date', async () => {
    const res = await api.createDate(tdGroupId, [{
      tdGroupId: tdGroupId,
      dateFrom: '2026-03-13',
      dateTo: '2026-03-16',
      description: 'playwright term date',
      kind: 'Closed',
      kindName: '',
      termName: 'Autumn',
      termDisplayName: ''
    }], token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
    tdId = body.result
  })

  await assertStep(report, 'GET Date By ID', async () => {
    const res = await api.getDateById(tdGroupId, tdId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'PUT Update Date', async () => {
    const res = await api.updateDate(tdGroupId, tdId, {
      tdGroupId: tdGroupId,
      tdId: tdId,
      dateFrom: '2026-03-14',
      dateTo: '2026-03-18',
      description: 'playwright term date updated',
      kind: 'Closed',
      kindName: '',
      termName: 'Summer',
      termDisplayName: ''
    }, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
  })

  await assertStep(report, 'DELETE Date', async () => {
    const res = await api.deleteDate(tdGroupId, tdId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
    tdId = undefined as any
  })

  await assertStep(report, 'DELETE Group', async () => {
    const res = await api.deleteGroup(tdGroupId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
    tdGroupId = undefined as any
  })

  report.summary()
})

test.afterEach(async ({ request, token }) => {
  const api = new TermDatesAPI(request)
  try {
    if (tdId && tdGroupId) {
      await api.deleteDate(tdGroupId, tdId, token)
      tdId = undefined as any
    }
  } catch {}
  try {
    if (tdGroupId) {
      await api.deleteGroup(tdGroupId, token)
      tdGroupId = undefined as any
    }
  } catch {}
})