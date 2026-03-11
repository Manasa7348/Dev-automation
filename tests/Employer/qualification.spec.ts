import { test, expect } from '../../fixtures/apifixture';
import { QualificationAPI } from '../../api/Employer/qualification.api';
import { TestReporter, assertStep } from '../../utils/reporter';

let quId: string;

test('Qualification API Framework Tests', async ({ request, token }) => {

  const qualification = new QualificationAPI(request);
  const report = new TestReporter('Employer › Qualification');

  // GET All
  await assertStep(report, 'GET All', async () => {

    const res = await qualification.getAll(token);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.isSuccess).toBe(true);

  });

  // POST Create
  await assertStep(report, 'POST Create', async () => {

    const uniqueName = `Qualification_${Date.now()}`;

    const payload = [
      {
        quName: uniqueName,
        wfCode: 'BEDO'
      }
    ];

    const res = await qualification.create(payload, token);
    expect(res.status()).toBe(200);

    const body = await res.json();

    if (!body.isSuccess) throw new Error(body.message);

    quId = body.result[0];

  });

  // GET By ID
  await assertStep(report, 'GET By ID', async () => {

    const res = await qualification.getById(quId, token);
    expect(res.status()).toBe(200);

    const body = await res.json();

    expect(body.isSuccess).toBe(true);
    expect(body.result.quId).toBe(quId);

  });

  // PUT Update (NO DATE)
  await assertStep(report, 'PUT Update', async () => {

    const res = await qualification.update(
      {
        quId: quId,
        quName: 'Playwright Qualification Updated',
        wfCode: 'BEDO'
      },
      token
    );

    expect(res.status()).toBe(200);

    const body = await res.json();

    if (!body.isSuccess) throw new Error(body.message);

  });

  // GET Template
  await assertStep(report, 'GET Template', async () => {

    const res = await qualification.getTemplate(token);
    expect(res.status()).toBe(200);

  });

  // DELETE
  await assertStep(report, 'DELETE', async () => {

    const res = await qualification.delete(quId, token);
    expect(res.status()).toBe(200);

    const body = await res.json();

    if (!body.isSuccess) throw new Error(body.message);

  });

  report.summary();
});

test.afterEach(async ({ request, token }) => {

  if (quId) {

    try {

      const qualification = new QualificationAPI(request);
      await qualification.delete(quId, token);

      quId = undefined as any;

    } catch {}

  }

});