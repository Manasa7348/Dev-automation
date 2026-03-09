import { test, expect } from '../../fixtures/apifixture'
import { PayElementsAPI } from '../../api/sector/payelements.s.api'
import { TestReporter, assertStep } from '../../utils/reporter'
import { checkDuplicateBeforeCreate } from '../../api/helpers/duplicate'

let peId: string

test('Pay Elements API Framework Tests', async ({ request, token }) => {
  const payElements = new PayElementsAPI(request)
  const report = new TestReporter('Sector › Pay Elements')

  await assertStep(report, 'GET All', async () => {
    const res = await payElements.getAll(token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'POST Create', async () => {
    const payload = {
      peName: 'Playwright Pay Element',
      peType: 1,
      peTax: true,
      peNi: false,
      peTps: true,
      peTpsBand: false,
      peLgps: true,
      peLgpsBand: true,
      peThirdParty: true,
      peUsedFor1: 12,
      peUsedFor2: 0,
      hide: false
    }

    // Stop test if duplicate exists
    await checkDuplicateBeforeCreate(payElements, token, payload, 'peName')

    const res = await payElements.create(payload, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
    peId = body.result[0].peId
  })

  await assertStep(report, 'GET By ID', async () => {
    const res = await payElements.getById(peId, token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'PUT Update', async () => {
    const res = await payElements.update(peId, {
      peId: peId,
      peName: 'Playwright Pay Element Updated',
      peType: 0,
      peTax: true,
      peNi: true,
      peTps: true,
      peTpsBand: true,
      peLgps: true,
      peLgpsBand: false,
      peThirdParty: false,
      peUsedFor1: 11,
      peUsedFor2: 0,
      hide: true
    }, token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'PATCH Archive', async () => {
    const res = await payElements.archive(peId, token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'PATCH Unarchive', async () => {
    const res = await payElements.unarchive(peId, token)
    expect(res.status()).toBe(200)
  })

  await assertStep(report, 'DELETE', async () => {
    const res = await payElements.delete(peId, token)
    expect(res.status()).toBe(200)
  })

  report.summary()
})

test.afterEach(async ({ request, token }) => {
  if (peId) {
    try {
      const payElements = new PayElementsAPI(request)
      await payElements.delete(peId, token)
      peId = undefined as any
    } catch {}
  }
})