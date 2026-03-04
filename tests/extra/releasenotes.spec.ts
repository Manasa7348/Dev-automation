import { test, expect } from '../../fixtures/apifixture';
import { ReleaseNotesAPI } from '../../api/extra/releasenotes.api';
import { TestReporter, assertStep } from '../../utils/reporter';

test('Sector - Release Notes API Tests', async ({ request, token }) => {

  const api = new ReleaseNotesAPI(request);
  const report = new TestReporter('Sector - Release Notes');

  // ─────────────────────────────
  // GET RELEASE NOTES
  // ─────────────────────────────
  await assertStep(report, 'GET Release Notes', async () => {

    const res = await api.getReleaseNotes(token);

    console.log('Status:', res.status());
    console.log('URL:', res.url());

    const body = await res.json();

    expect(res.status()).toBe(200);
    expect(body.isSuccess).toBeTruthy();
    expect(Array.isArray(body.result)).toBeTruthy();

    console.log('Total Release Notes:', body.result.length);

    // Optional field validation
    if (body.result.length > 0) {
      const first = body.result[0];

      expect(first).toHaveProperty('rId');
      expect(first).toHaveProperty('rNo');
      expect(first).toHaveProperty('rDate');
      expect(first).toHaveProperty('rVersion');
      expect(first).toHaveProperty('rDetails');
    }
  });

  report.summary();
});