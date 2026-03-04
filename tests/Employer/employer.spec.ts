import { test, expect } from '../../fixtures/apifixture';
import { EmployersAPI } from '../../api/Employer/employer.api';
import { TestReporter, assertStep } from '../../utils/reporter';

let erId: string | undefined;

test.skip('Sector › Employers API Framework Tests', async ({ request, token }) => {
  const employers = new EmployersAPI(request, token);
  const report = new TestReporter('Sector › Employers');


  // ─────────────────────────────────────────
  // CRUD FLOW
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Employers', async () => {
    const res = await employers.getAll('EDU');
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'POST Add Employer', async () => {
    const res = await employers.addEmployer({
      name: 'manasa_api',
      addr1: '78/1',
      addr2: 'string',
      addr3: 'string',
      addr4: 'string',
      postcode: '577208',
      creBy: 0,
      creDate: new Date().toISOString(),
      amdBy: 0,
      amdDate: new Date().toISOString(),
      isDeleted: false,
      sectorId: 'EDU',
      reference: 'string',
      regionId: 'ENG',
      goLiveDate: '2026-03-04',
      status: 0,
      logoName: 'MANI.jpg',
      logoCnt: 0,
      uploadFile: 'string'
    });

    expect(res.status()).toBe(200);
    const body = await res.json();

    if (body.isSuccess) {
      erId = body.result;
    }
  });

  await assertStep(report, 'GET Employer By ID', async () => {
    const res = await employers.getById(erId!);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PUT Update Employer', async () => {
    const res = await employers.updateEmployer({
      erId: erId,
      name: 'mani_API',
      addr1: '86/1',
      addr2: 'string',
      addr3: 'string',
      addr4: 'string',
      postcode: '577206',
      creBy: 0,
      creDate: new Date().toISOString(),
      amdBy: 0,
      amdDate: new Date().toISOString(),
      isDeleted: false,
      sectorId: 'EDU',
      reference: 'string',
      regionId: 'CYM',
      goLiveDate: '2026-03-04',
      status: 0,
      logoName: 'MN.jpg',
      logoCnt: 0,
      uploadFile: 'string'
    });

    expect(res.status()).toBe(200);
  });

 await assertStep(report, 'POST Upload Logo', async () => {
  const res = await employers.uploadLogo(erId!);

  console.log("Status:", res.status());
  console.log("Response:", await res.text());

  expect(res.status()).toBe(200);
});

  await assertStep(report, 'GET Employer Logo', async () => {
    const res = await employers.getLogo(erId!);
    expect(res.status()).toBe(200);
  });

//   await assertStep(report, 'DELETE Employer', async () => {
//     const res = await employers.deleteEmployer(erId!);
//     expect(res.status()).toBe(200);
//     erId = undefined;
//   });

  report.summary();
});