import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { FileStorageAdapter } from '../adapters/fileStorageAdapter.js';

async function fixture(t) {
  const dir = await mkdtemp(join(tmpdir(), 'cyberclub-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const folder = join(dir, 'data');
  const file = join(folder, 'bookings.json');
  return { folder, file, storage: new FileStorageAdapter(file) };
}

test('a missing file returns an empty list without creating a file', async (t) => {
  const { file, storage } = await fixture(t);
  assert.deepEqual(storage.load(), []);
  await assert.rejects(readFile(file), { code: 'ENOENT' });
});

test('creates a directory, replaces JSON and leaves no temporary file', async (t) => {
  const { folder, file, storage } = await fixture(t);
  storage.save([{ id: 'old' }]);
  storage.save([{ id: 'new' }]);
  assert.deepEqual(new FileStorageAdapter(file).load(), [{ id: 'new' }]);
  assert.deepEqual(await readdir(folder), ['bookings.json']);
});

test('a damaged JSON file loads an empty list', async (t) => {
  const { folder, file, storage } = await fixture(t);
  await mkdir(folder);
  await writeFile(file, '[broken');
  assert.deepEqual(storage.load(), []);
});

test('does not treat a real file access error as an empty list', async (t) => {
  const { file, storage } = await fixture(t);
  await mkdir(file, { recursive: true });
  assert.throws(() => storage.load());
});
