import { test, expect } from '../../fixtures/apifixture'
import { QualificationAPI } from '../../api/sector/qualification.s.api'
import { TestReporter, assertStep } from '../../utils/reporter'
import { checkDuplicateBeforeCreate } from '../../api/helpers/duplicate'

let qualificationId: string

test('Sector Qualification API Framework Tests', async ({ request, token }) => {

  const qualification = new QualificationAPI(request)
  const report = new TestReporter('Sector - Qualification')

  // ─────────────────────────────
  // GET ALL
  // ─────────────────────────────
  await assertStep(report, 'GET All Qualifications', async () => {
    const res = await qualification.getAll(token)
    expect(res.status()).toBe(200)
  })

  // ─────────────────────────────
  // CREATE
  // ─────────────────────────────
  await assertStep(report, 'Create Qualification', async () => {
    const payload = {
      quName: 'sector420',
      wfCode: 'FRST'
    }

    // Stop test if duplicate exists
    await checkDuplicateBeforeCreate(qualification, token, payload, 'quName')

    const res = await qualification.addQualification([payload], token)
    const body = await res.json()

    expect(res.status()).toBe(200)
    expect(body.isSuccess || body.IsSuccess).toBeTruthy()

    qualificationId = body.result[0]
  })

  // ─────────────────────────────
  // GET BY ID
  // ─────────────────────────────
  await assertStep(report, 'GET Qualification By ID', async () => {
    const res = await qualification.getById(qualificationId, token)
    expect(res.status()).toBe(200)
  })

  // ─────────────────────────────
  // UPDATE
  // ─────────────────────────────
  await assertStep(report, 'Update Qualification', async () => {
    const res = await qualification.updateQualification({
      quId: qualificationId,
      quName: 'sector420 updated',
      wfCode: 'NQF3'
    }, token)

    const body = await res.json()
    expect(res.status()).toBe(200)
    expect(body.isSuccess || body.IsSuccess).toBeTruthy()
  })

  // ─────────────────────────────
  // DELETE
  // ─────────────────────────────
  await assertStep(report, 'Delete Qualification', async () => {
    const res = await qualification.deleteQualification(qualificationId, token)
    expect(res.status()).toBe(200)
  })
 
  report.summary()
})

test.afterEach(async ({ request, token }) => {
  if (qualificationId) {
    try {
      const qualification = new QualificationAPI(request)
      await qualification.deleteQualification(qualificationId, token)
      qualificationId = undefined as any
    } catch (error) {
      console.log('Cleanup failed:', error)
    }
  }
})