import { test, expect } from '../../fixtures/apifixture';
import { PayElementTableAPI } from '../../api/community/payelementtable.c.api';
import { TestReporter, assertStep } from '../../utils/reporter';
import path from 'path';

let petId: string;

test('Pay Element Table API Framework Tests', async ({ request, token }) => {
  const payElementTable = new PayElementTableAPI(request, token);
  const report = new TestReporter('Community › PayElementTable');

  // ─────────────────────────────────────────
  // PRE-CLEANUP
  // ─────────────────────────────────────────

  await assertStep(report, 'Pre-cleanup Existing Pay Element Tables', async () => {
    const allRes = await payElementTable.getAll(token);
    const allBody = await allRes.json();

    if (allBody.result) {
      for (const pet of allBody.result) {
        if (pet.name === 'pet420' || pet.name === 's420') {
          await payElementTable.deletePayElementTable(pet.id, token);
        }
      }
    }
  });

  // ─────────────────────────────────────────
  // PAY ELEMENT TABLE CRUD
  // ─────────────────────────────────────────

  await assertStep(report, 'GET All Pay Element Tables', async () => {
    const res = await payElementTable.getAll(token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'POST Add Pay Element Table', async () => {
    const res = await payElementTable.addPayElementTable(
      [
        {
          name: 'pet420',
          description: 'desc',
          type: 1,
          logoExtension: '.jpg',
          items: [
            {
              levelName: 'lv1',
              money1: 10,
              money2: 20,
              money3: 0,
              ordering: 0
            }
          ]
        }
      ],
      token
    );

    expect(res.status()).toBe(200);
    const body = await res.json();

    if (body.isSuccess || body.IsSuccess) {
      petId = body.result[0];
    } else {
      throw new Error(`Failed to add pay element table: ${body.message || body.Message}`);
    }
  });

  // ─────────────────────────────────────────
  // LOGO
  // ─────────────────────────────────────────

  const filePath = path.resolve('tests/assets/download.jpg');

  await assertStep(report, 'POST Upload Logo', async () => {
    const res = await payElementTable.uploadLogo(petId, filePath);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Logo', async () => {
    const res = await payElementTable.getLogo(petId);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // ITEMS
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Pay Element Table Items', async () => {
    const res = await payElementTable.getItems(petId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // UPDATE
  // ─────────────────────────────────────────

  await assertStep(report, 'PUT Update Pay Element Table', async () => {
    const res = await payElementTable.updatePayElementTable(
      petId,
      {
        name: 's420',
        description: 'st',
        type: 2,
        logoExtension: '.jpg',
        items: [
          {
            levelName: 'lv1',
            money1: 10,
            money2: 20,
            money3: 30,
            ordering: 0
          }
        ]
      },
      token
    );

    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // ARCHIVE / UNARCHIVE
  // ─────────────────────────────────────────

  await assertStep(report, 'PATCH Archive Pay Element Table', async () => {
    const res = await payElementTable.archivePayElementTable(petId, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'PATCH Unarchive Pay Element Table', async () => {
    const res = await payElementTable.unarchivePayElementTable(petId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // TEMPLATE & EXPORT
  // ─────────────────────────────────────────

  await assertStep(report, 'GET Download Template', async () => {
    const res = await payElementTable.downloadTemplate(2, token);
    expect(res.status()).toBe(200);
  });

  await assertStep(report, 'GET Export Pay Element Table', async () => {
    const res = await payElementTable.exportPayElementTable(petId, token);
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────

  await assertStep(report, 'DELETE Pay Element Table', async () => {
    const res = await payElementTable.deletePayElementTable(petId, token);
    expect(res.status()).toBe(200);
  });

  report.summary();
});