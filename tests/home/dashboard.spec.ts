import { test, expect } from '../../fixtures/apifixture';
import { UserDashboardAPI } from '../../api/extra/dashboard-users.api';
import { TestReporter, assertStep } from '../../utils/reporter';

test('Sector - Users & Dashboard API Tests', async ({ request, token }) => {

  const api = new UserDashboardAPI(request);
  const report = new TestReporter('Home- Users & Dashboard');

  // Hardcoded employerId (from Swagger – working one)
  const dashboardEmployerId = '58f70185-d74a-494a-91de-38e33ef8b576';

  // ─────────────────────────────
  // GET ALL USERS
  // ─────────────────────────────
  await assertStep(report, 'GET All Users', async () => {

    const res = await api.getAllUsers(token);
    const body = await res.json();

   

    expect(res.status()).toBe(200);
    expect(body.isSuccess).toBeTruthy();
    expect(Array.isArray(body.result)).toBeTruthy();

   
  });

  // ─────────────────────────────
  // GET DASHBOARD DETAILS
  // ─────────────────────────────
  await assertStep(report, 'GET Dashboard Details', async () => {

    const res = await api.getDashboardDetails(
      dashboardEmployerId,
      token
    );

   

    const body = await res.json();

    expect(res.status()).toBe(200);
    expect(body.isSuccess).toBeTruthy();

    expect(Array.isArray(body.result.homeDashBoardLookupsResults)).toBeTruthy();
    expect(Array.isArray(body.result.events)).toBeTruthy();
  });

  // ─────────────────────────────
  // GET DASHBOARD LOGOS
  // ─────────────────────────────
  await assertStep(report, 'GET Dashboard Logos', async () => {

    const res = await api.getDashboardLogos(
      dashboardEmployerId,
      token
    );

    const body = await res.json();

    expect(res.status()).toBe(200);
    expect(body.isSuccess).toBeTruthy();
    expect(Array.isArray(body.result.locationsLogosUrl)).toBeTruthy();
  });

  report.summary();
});