import { test, expect } from '../../fixtures/apifixture';
import { DepartmentsAPI } from '../../api/community/departments.c.api';
import { TestReporter, assertStep } from '../../utils/reporter';

let departmentId: string;

test('Departments API Framework Tests', async ({ request, token }) => {
  const departments = new DepartmentsAPI(request);
  const report = new TestReporter('Community › Departments');

  await assertStep(report, 'GET All', async () => {
    const res = await departments.getAll(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'POST Create', async () => {
    const res = await departments.addDepartment([{
      deptName: 'Playwright Test Department'
    }], token);
    expect(res.status()).toBe(200);
    const body = await res.json();
    if (!body.isSuccess && !body.IsSuccess) throw new Error(body.message || body.Message);
    departmentId = body.result[0];
  });

  await assertStep(report, 'GET By ID', async () => {
    const res = await departments.getById(departmentId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PUT Update', async () => {
    const res = await departments.updateDepartment({
      deptId: departmentId,
      deptName: 'Playwright Test Department Updated'
    }, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'DELETE', async () => {
    const res = await departments.deleteDepartment(departmentId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Template', async () => {
    const res = await departments.downloadTemplate(token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});

test.afterEach(async ({ request, token }) => {
  if (departmentId) {
    try {
      const departments = new DepartmentsAPI(request);
      await departments.deleteDepartment(departmentId, token);
    } catch {}
  }
});