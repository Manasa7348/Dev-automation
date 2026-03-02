import { test, expect } from '../../fixtures/apifixture';
import { ScreensAPI } from '../../api/sector/screens.api';
import { TestReporter, assertStep } from '../../utils/reporter';

test.describe('Screens API Module', () => {
  test('Validate Screens Flow by Sector', async ({ request, token }) => {
    const reporter = new TestReporter('Sector - Screen');
    const screensAPI = new ScreensAPI(request);

    const version = '1';
    const sectorId = 'EDU';

    let screenId: string;
    let screenNo: number;

    // 🔹 Step 1: Get Screens by Sector
    await assertStep(reporter, 'Get Screens by Sector', async () => {
      const res = await screensAPI.getScreens(version, sectorId, token);
      expect(res.status()).toBe(200);

      const body = await res.json();
      expect(body.result.length).toBeGreaterThan(0);

      screenId = body.result[0].scrId;
      screenNo = body.result[0].scrNo;
    });

    // 🔹 Step 2: Get Screen by ID
    await assertStep(reporter, 'Get Screen by ID', async () => {
      const res = await screensAPI.getScreenById(version, screenId, token);
      expect(res.status()).toBe(200);

      const body = await res.json();
      expect(body.result.scrId).toBe(screenId);
    });

    // 🔹 Step 3: Get Help Text by Screen No
    await assertStep(reporter, 'Get HelpText by ScreenNo', async () => {
      const res = await screensAPI.getHelpText(version, screenNo, token);
      expect(res.status()).toBe(200);

      const body = await res.json();
      expect(body.result.scrNo).toBe(screenNo);
    });

    reporter.summary();
  });
});