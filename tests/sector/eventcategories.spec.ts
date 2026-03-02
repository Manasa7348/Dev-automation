import { test, expect } from '../../fixtures/apifixture';
import { EventsCategoriesAPI } from '../../api/sector/eventcategories.api';
import { TestReporter, assertStep } from '../../utils/reporter';
test.describe('Events Categories Module', () => {
  test('Validate Full Events Categories Flow', async ({ request, token }) => {
    const reporter = new TestReporter('Sector - Events Categories Module');
    const api = new EventsCategoriesAPI(request);

    const version = '1';

    let categoryId: string;
    let eventId: string;

    // 🔹 Step 1: Get All Categories
    await assertStep(reporter, 'Get All Event Categories', async () => {
      const res = await api.getAllCategories(version, token);
      expect(res.status()).toBe(200);

      const body = await res.json();
      expect(body.isSuccess).toBeTruthy();
      expect(body.result.length).toBeGreaterThan(0);

      categoryId = body.result[0].evtCatgId;
    });

    // 🔹 Step 2: Get Category By ID
    await assertStep(reporter, 'Get Category By ID', async () => {
      const res = await api.getCategoryById(
        version,
        categoryId,
        token
      );
      expect(res.status()).toBe(200);

      const body = await res.json();
      expect(body.result.evtCatgId).toBe(categoryId);
    });

    // 🔹 Step 3: Get Events Under Category
    await assertStep(reporter, 'Get Events Under Category', async () => {
      const res = await api.getEventsByCategory(
        version,
        categoryId,
        token
      );
      expect(res.status()).toBe(200);

      const body = await res.json();
      expect(body.result.length).toBeGreaterThan(0);

      eventId = body.result[0].evtId;
    });

    // 🔹 Step 4: Get Event By ID
    await assertStep(reporter, 'Get Event By ID', async () => {
      const res = await api.getEventById(
        version,
        categoryId,
        eventId,
        token
      );
      expect(res.status()).toBe(200);

      const body = await res.json();
      expect(body.result.evtId).toBe(eventId);
    });

    reporter.summary();
  });
});