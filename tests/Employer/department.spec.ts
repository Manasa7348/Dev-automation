import { test, expect } from '../../fixtures/apifixture';
import { DepartmentAPI } from '../../api/Employer/department.api';
import { TestReporter, assertStep } from '../../utils/reporter';

let deptId: string;

test('Department API Framework Tests', async ({ request, token }) => {

  const department = new DepartmentAPI(request);
  const report = new TestReporter('Employer › Department');

  // GET All
  await assertStep(report, 'GET All', async () => {

    const res = await department.getAll(token);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.isSuccess).toBe(true);

  });

  // POST Create
  await assertStep(report, 'POST Create', async () => {

    const uniqueName = `Dept_${Date.now()}`;

    const payload = [
      {
        deptName: uniqueName
      }
    ];

    const res = await department.create(payload, token);
    expect(res.status()).toBe(200);

    const body = await res.json();

    if (!body.isSuccess) throw new Error(body.message);

    deptId = body.result[0];

  });

  // GET By ID
  await assertStep(report, 'GET By ID', async () => {

    const res = await department.getById(deptId, token);
    expect(res.status()).toBe(200);

    const body = await res.json();

    expect(body.isSuccess).toBe(true);
    expect(body.result.deptId).toBe(deptId);

  });

  // PUT Update (NO DATE)
  await assertStep(report, 'PUT Update', async () => {

    const res = await department.update(
      {
        deptId: deptId,
        deptName: 'Playwright Department Updated'
      },
      token
    );

    expect(res.status()).toBe(200);

    const body = await res.json();

    if (!body.isSuccess) throw new Error(body.message);

  });

  // GET Template
  await assertStep(report, 'GET Template', async () => {

    const res = await department.getTemplate(token);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.isSuccess).toBe(true);

  });

  //DELETE
  await assertStep(report, 'DELETE', async () => {

    const res = await department.delete(deptId, token);
    expect(res.status()).toBe(200);

    const body = await res.json();

    if (!body.isSuccess) throw new Error(body.message);

  });

  report.summary();
});

test.afterEach(async ({ request, token }) => {

  if (deptId) {

    try {

      const department = new DepartmentAPI(request);
      await department.delete(deptId, token);

      deptId = undefined as any;

    } catch {}

  }

});