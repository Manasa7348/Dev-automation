import { test, expect } from '../../fixtures/apifixture'
import { LocationsAPI } from '../../api/Employer/location.api'
import { ContactsAPI } from '../../api/Employer/contacts.api'
import { TestReporter, assertStep } from '../../utils/reporter'
import { getIds, clearIds } from './shared-ids'

test('Employer Cleanup', async ({ request, token }) => {
  const locApi = new LocationsAPI(request)
  const contactApi = new ContactsAPI(request)
  const report = new TestReporter('Employer › Cleanup')

  const { locId, contactId } = getIds()

  await assertStep(report, 'DELETE Contact', async () => {
    if (!contactId) throw new Error('No contactId in shared-ids')
    const res = await contactApi.delete([contactId], token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
  })

  await assertStep(report, 'DELETE Location', async () => {
    if (!locId) throw new Error('No locId in shared-ids')
    const res = await locApi.delete(locId, token)
    expect(res.status()).toBe(200)
    const body = await res.json()
    if (!body.isSuccess) throw new Error(body.message)
  })

  clearIds()
  report.summary()
})
