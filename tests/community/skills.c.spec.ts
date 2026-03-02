import { test, expect } from '../../fixtures/apifixture';
import { SkillsAPI } from '../../api/community/skills.c.api';
import { TestReporter, assertStep } from '../../utils/reporter';

let skillId: string;

test('CommSkill API Framework Tests', async ({ request, token }) => {
  const skills = new SkillsAPI(request);
  const report = new TestReporter('Community › Skills');

  // ─────────────────────────────────────────
  // GET ALL
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Skills', async () => {
    const res = await skills.getAll(token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // CREATE
  // ─────────────────────────────────────────

  await assertStep(report, 'POST Add Skill', async () => {
    const res = await skills.addSkill(
      [
        {
          skName: 'Playwright Automation Test',
          skDesc: 'Automation testing with Playwright',
          isHide: false
        }
      ],
      token
    );

    expect(res.status()).toBe(200);
    const body = await res.json();

    if (body.isSuccess || body.IsSuccess) {
      skillId = body.result[0];
    } else {
      throw new Error(`Failed to add skill: ${body.message || body.Message}`);
    }
  });

  // ─────────────────────────────────────────
  // GET BY ID
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Skill By ID', async () => {
    const res = await skills.getById(skillId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // UPDATE
  // ─────────────────────────────────────────

  await assertStep(report, 'PUT Update Skill', async () => {
    const res = await skills.updateSkill(
      {
        skId: skillId,
        skName: 'Playwright Automation Test Updated',
        skDesc: 'Updated description',
        isHide: false
      },
      token
    );

    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────

  await assertStep(report, 'DELETE Skill', async () => {
    const res = await skills.deleteSkill(skillId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // TEMPLATE
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Download Template for Skills', async () => {
    const res = await skills.downloadTemplate(token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});

// ─────────────────────────────────────────
// CLEANUP HOOK
// ─────────────────────────────────────────

test.afterEach(async ({ request, token }) => {
  if (skillId) {
    try {
      const skills = new SkillsAPI(request);
      await skills.deleteSkill(skillId, token);
    } catch {
      // Already deleted — safe to ignore
    }
  }
});