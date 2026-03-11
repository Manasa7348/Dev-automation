import { test, expect } from '../../fixtures/apifixture';
import { SkillsAPI } from '../../api/Employer/skills.api';
import { TestReporter, assertStep } from '../../utils/reporter';

let skId: string;

test('Skills API Framework Tests', async ({ request, token }) => {

  const skills = new SkillsAPI(request);
  const report = new TestReporter('Employer › Skills');

  // GET All
  await assertStep(report, 'GET All', async () => {

    const res = await skills.getAll(token);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.isSuccess).toBe(true);

  });

  // GET Skill Lookup
  await assertStep(report, 'GET Skill Lookup', async () => {

    const res = await skills.getSkillLookup(token);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.isSuccess).toBe(true);

  });

  // POST Create
  await assertStep(report, 'POST Create', async () => {

    const uniqueName = `Skill_${Date.now()}`;

    const payload = [
      {
        skNo: 0,
        erNo: 0,
        skName: uniqueName,
        creBy: 0,
        creDate: new Date().toISOString(),
        amdBy: 0,
        amdDate: new Date().toISOString(),
        isDeleted: false
      }
    ];

    const res = await skills.create(payload, token);
    expect(res.status()).toBe(200);

    const body = await res.json();

    if (!body.isSuccess) throw new Error(body.message);

    skId = body.result[0];

  });

  // GET By ID
  await assertStep(report, 'GET By ID', async () => {

    const res = await skills.getById(skId, token);
    expect(res.status()).toBe(200);

    const body = await res.json();

    expect(body.isSuccess).toBe(true);
    expect(body.result.skId).toBe(skId);

  });

  // PUT Update
  await assertStep(report, 'PUT Update', async () => {

    const res = await skills.update(
      {
        skNo: 0,
        erNo: 0,
        skId: skId,
        skName: 'Playwright Skill Updated',
        creBy: 0,
        creDate: new Date().toISOString(),
        amdBy: 0,
        amdDate: new Date().toISOString(),
        isDeleted: false
      },
      token
    );

    expect(res.status()).toBe(200);

    const body = await res.json();

    if (!body.isSuccess) throw new Error(body.message);

  });

  // GET Template
  await assertStep(report, 'GET Template', async () => {

    const res = await skills.getTemplate(token);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.isSuccess).toBe(true);

  });

  // DELETE
  await assertStep(report, 'DELETE', async () => {

    const res = await skills.delete(skId, token);
    expect(res.status()).toBe(200);

    const body = await res.json();

    if (!body.isSuccess) throw new Error(body.message);

  });

  report.summary();
});


test.afterEach(async ({ request, token }) => {

  if (skId) {

    try {

      const skills = new SkillsAPI(request);
      await skills.delete(skId, token);

      skId = undefined as any;

    } catch {}

  }

});