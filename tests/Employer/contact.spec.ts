import { test, expect } from '../../fixtures/apifixture'
import { ContactsAPI } from '../../api/Employer/contacts.api'
import { TestReporter, assertStep } from '../../utils/reporter'
import { getIds, saveIds } from './shared-ids'

let contactId: string

test('Contacts API Framework Tests', async ({ request, token }) => {
  const api = new ContactsAPI(request)
  const report = new TestReporter('Employer › Contacts')

  const { locId } = getIds()
  if (!locId) throw new Error('locId not found — run location.spec.ts first')

  await assertStep(report, 'GET All Contacts', async () => {
    const res = await api.getAll(token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'POST Create Contact', async () => {
    const res = await api.create([{
      title: 'Ms',
      fname: `playwright ${Date.now()}`,
      mname: 'test',
      sname: 'contact',
      position: 'engineer',
      email: `playwright${Date.now()}@test.com`,
      phone: '7348978427',
      comms: true
    }], token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
    contactId = body.result[0]
    saveIds({ ...getIds(), contactId })
  })

  await assertStep(report, 'GET Contact By ID', async () => {
    const res = await api.getById(contactId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'PUT Update Contact', async () => {
    const res = await api.update(contactId, {
      contactId: contactId,
      title: 'Mrs',
      fname: 'playwright updated',
      mname: 'test',
      sname: 'contact',
      position: 'senior engineer',
      email: `playwright${Date.now()}@test.com`,
      phone: '8722837034',
      comms: false
    }, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
  })

  await assertStep(report, 'GET All Assign', async () => {
    const res = await api.getAssign(token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'GET Assign By Contact ID', async () => {
    const res = await api.getAssignById(contactId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.isSuccess).toBe(true)
  })

  await assertStep(report, 'PUT Update Assign', async () => {
    const res = await api.updateAssign({
      contactId: contactId,
      contactFullName: 'playwright updated',
      locations: [{
        locationId: locId,
        isChecked: true,
        locationName: 'playwright location'
      }]
    }, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
  })

  report.summary()
})