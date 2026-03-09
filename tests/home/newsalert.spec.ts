import { test, expect } from '../../fixtures/apifixture';
import { NewsAlertAPI } from '../../api/extra/newsalerts.api';
import { TestReporter, assertStep } from '../../utils/reporter';

let newsNo: number;

test('System News Alert API Tests', async ({ request, token }) => {

  const api = new NewsAlertAPI(request);
  const report = new TestReporter('Home › News Alert');
  const version = '1';

  // ─────────────────────────────
  // GET ALL
  // ─────────────────────────────
  await assertStep(report, 'GET All News Alerts', async () => {
    const res = await api.getAll(version, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────
  // CREATE
  // ─────────────────────────────
  await assertStep(report, 'POST Create News Alert', async () => {
    const res = await api.create(version, {
      nType: "2",
      nTitle: `Auto-News-${Date.now()}`,
      nShowAs: 3,
      nUrl: "https://google.com",
      nPopupText: "",
      validFrom: new Date().toISOString(),
      validTo: new Date().toISOString(),
      hide: false
    }, token);

    const body = await res.json();
    expect(res.status()).toBe(200);
    expect(body.isSuccess).toBeTruthy();

    newsNo = body.result;
  });

  // ─────────────────────────────
  // GET BY ID
  // ─────────────────────────────
  await assertStep(report, 'GET News Alert By ID', async () => {
    const res = await api.getById(version, newsNo, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────
  // UPDATE
  // ─────────────────────────────
  await assertStep(report, 'PUT Update News Alert', async () => {
    const res = await api.update(version, {
      newsNo: newsNo,
      nType: "4",
      nTitle: "Auto-News-Updated",
      nShowAs: 2,
      nUrl: "https://dev.tenzingtechnologies.com/admin/news",
      nPopupText: "",
      validFrom: new Date().toISOString(),
      validTo: new Date().toISOString(),
      hide: true
    }, token);

    const body = await res.json();
    expect(res.status()).toBe(200);
    expect(body.isSuccess).toBeTruthy();
  });

  // ─────────────────────────────
  // ARCHIVE
  // ─────────────────────────────
  await assertStep(report, 'PATCH Archive News Alert', async () => {
    const res = await api.archive(version, newsNo, true, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────
  // UNARCHIVE
  // ─────────────────────────────
  await assertStep(report, 'PATCH Unarchive News Alert', async () => {
    const res = await api.unarchive(version, newsNo, true, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────
  // DELETE
  // ─────────────────────────────
  await assertStep(report, 'DELETE News Alert', async () => {
    const res = await api.delete(version, newsNo, token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});

test.afterEach(async ({ request, token }) => {
  if (newsNo) {
    try {
      const api = new NewsAlertAPI(request);
      await api.delete('1', newsNo, token);
      newsNo = undefined as any;
    } catch (error) {
      console.log('Cleanup failed:', error);
    }
  }
});