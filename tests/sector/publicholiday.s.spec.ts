import { test, expect } from '../../fixtures/apifixture';
import { PublicHolidayAPI } from '../../api/sector/publicholiday.s.api';
import { TestReporter, assertStep } from '../../utils/reporter';

let holidayId: string;

test('System Public Holiday API Tests', async ({ request, token }) => {

  const holiday = new PublicHolidayAPI(request);
  const report = new TestReporter('Sector - Public Holiday ');

  const region = 'CYM';

  // ─────────────────────────────
  // GET ALL
  // ─────────────────────────────
  await assertStep(report, 'GET Public Holidays by Region', async () => {
    const res = await holiday.getAll(region, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────
  // CREATE
  // ─────────────────────────────
  await assertStep(report, 'Create Public Holiday', async () => {
    const res = await holiday.create({
      regionId: region,
      hDate: '2027-03-02',
      description: 'Automation Holiday',
      creBy: 0,
      creDate: new Date().toISOString(),
      amdBy: 0,
      amdDate: new Date().toISOString()
    }, token);

    const body = await res.json();

    expect(res.status()).toBe(200);
    expect(body.isSuccess).toBeTruthy();

    holidayId = body.result;
  });

  // ─────────────────────────────
  // GET BY ID
  // ─────────────────────────────
  await assertStep(report, 'GET Public Holiday By ID', async () => {
    const res = await holiday.getById(holidayId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────
  // UPDATE
  // ─────────────────────────────
  await assertStep(report, 'Update Public Holiday', async () => {
    const res = await holiday.update(holidayId, {
      id: holidayId,
      regionId: region,
      hDate: '2027-03-02',
      description: 'Automation Holiday Updated',
      creBy: 0,
      creDate: new Date().toISOString(),
      amdBy: 0,
      amdDate: new Date().toISOString()
    }, token);

    const body = await res.json();

    expect(res.status()).toBe(200);
    expect(body.isSuccess).toBeTruthy();
  });

  // ─────────────────────────────
  // DELETE
  // ─────────────────────────────
  await assertStep(report, 'Delete Public Holiday', async () => {
    const res = await holiday.delete(holidayId, token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});
test.afterEach(async ({ request, token }) => {
  if (holidayId) {
    try {
      const holiday = new PublicHolidayAPI(request);
      await holiday.delete(holidayId, token);
      holidayId = undefined as any; // reset
    } catch (error) {
      console.log('Cleanup failed:', error);
    }
  }
});