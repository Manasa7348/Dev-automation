import { test, expect } from '../../fixtures/apifixture'
import { LocationsAPI } from '../../api/Employer/location.api'
import { TestReporter, assertStep } from '../../utils/reporter'
import { getIds, saveIds } from './shared-ids'
import * as path from 'path'

let locId: string
const LOC_NAME = `playwright location ${Date.now()}`

test('Locations API Framework Tests', async ({ request, token }) => {
  const api = new LocationsAPI(request)
  const report = new TestReporter('Employer › Locations')

  await assertStep(report, 'GET All Locations', async () => {
    const res = await api.getAll(token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'GET Lookup', async () => {
    const res = await api.getLookup(token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'POST Create Location', async () => {
    const res = await api.create([{
      locId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: LOC_NAME,
      addr1: '86/2',
      addr2: null,
      addr3: null,
      addr4: 'india',
      postcode: '577201',
      goLiveDate: '2026-03-14',
      stagingDate: '2026-03-19',
      reference: null,
      tdGroupId: null,
      schoolPhase: '4',
      goverance: '8',
      authority: '889',
      uploadFile: null,
      logoCnt: 0,
      logoUrl: '',
      logoName: 'c4.jpg'
    }], token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
    locId = body.result[0]
    saveIds({ ...getIds(), locId })
  })

  await assertStep(report, 'GET Location By ID', async () => {
    const res = await api.getById(locId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'PUT Update Location', async () => {
    const res = await api.update(locId, {
      locId: locId,
      name: `${LOC_NAME} updated`,
      addr1: '86/2',
      addr2: null,
      addr3: null,
      addr4: 'india',
      postcode: '577201',
      goLiveDate: '2026-03-14',
      stagingDate: '2026-03-19',
      reference: null,
      tdGroupId: null,
      schoolPhase: '4',
      goverance: '8',
      authority: '889',
      uploadFile: null,
      logoCnt: 0,
      logoUrl: '',
      logoName: 'c4.jpg'
    }, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
  })

  await assertStep(report, 'POST Upload Logo', async () => {
    const filePath = path.resolve(__dirname, '../assets/download.jpg')
    const res = await api.uploadLogo(locId, filePath, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
  })

  await assertStep(report, 'GET Logo', async () => {
    const res = await api.getLogo(locId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  report.summary()
})