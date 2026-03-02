import { test, expect } from '../../fixtures/apifixture';
import { JobRolesAPI } from '../../api/community/jobroles.c.api';
import { TestReporter, assertStep } from '../../utils/reporter';

let jobRoleId: string;

test('Job Roles API Framework Tests', async ({ request, token }) => {
  const jobRoles = new JobRolesAPI(request);
  const report = new TestReporter('Community › JobRoles');

  // ─────────────────────────────────────────
  // PRE-CLEANUP
  // ─────────────────────────────────────────

  await assertStep(report, 'Pre-cleanup Existing Job Roles', async () => {
    const allJobRolesRes = await jobRoles.getAll(token);
    const allJobRolesBody = await allJobRolesRes.json();

    if (allJobRolesBody.result) {
      for (const jr of allJobRolesBody.result) {
        if (
          jr.jrName === 'Playwright Test Job Role' ||
          jr.jrName === 'Playwright Test Job Role Updated'
        ) {
          await jobRoles.deleteJobRole(jr.jrId, token);
        }
      }
    }
  });

  // ─────────────────────────────────────────
  // CRUD OPERATIONS
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Job Roles', async () => {
    const res = await jobRoles.getAll(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'POST Add Job Role', async () => {
    const res = await jobRoles.addJobRole(
      [
        {
          jrName: 'Playwright Test Job Role',
          wfcPost: 'TEST',
          wfcRole: 'TSTR'
        }
      ],
      token
    );

    expect(res.status()).toBe(200);
    const body = await res.json();

    if (body.isSuccess || body.IsSuccess) {
      jobRoleId = body.result[0];
    } else {
      throw new Error(`Failed to add job role: ${body.message || body.Message}`);
    }
  });

  await assertStep(report, 'GET Job Role By ID', async () => {
    const res = await jobRoles.getById(jobRoleId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PUT Update Job Role', async () => {
    const res = await jobRoles.updateJobRole(
      jobRoleId,
      {
        jrId: jobRoleId,
        jrName: 'Playwright Test Job Role Updated',
        wfcPost: 'UPDT',
        wfcRole: 'UPDR'
      },
      token
    );

    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'DELETE Job Role', async () => {
    const res = await jobRoles.deleteJobRole(jobRoleId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Download Template', async () => {
    const res = await jobRoles.downloadTemplate(token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});

// ✅ Cleanup hook (kept outside reporter by design)
test.afterEach(async ({ request, token }) => {
  if (jobRoleId) {
    try {
      const jobRoles = new JobRolesAPI(request);
      await jobRoles.deleteJobRole(jobRoleId, token);
    } catch {
      // already deleted or not found
    }
  }
});