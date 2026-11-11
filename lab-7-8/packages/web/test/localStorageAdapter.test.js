import test from 'node:test';
import assert from 'node:assert/strict';
import { BookingsService } from '@cyberclub/core';
import { LocalStorageAdapter, STORAGE_KEY } from '../src/shared/storage/localStorageAdapter.js';

function fakeStorage() {
  const data = new Map();
  return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
}

test('an empty store loads an empty list', () => {
  assert.deepEqual(new LocalStorageAdapter(fakeStorage()).load(), []);
});

test('data is written and read as JSON under the booking key', () => {
  const storage = fakeStorage();
  new LocalStorageAdapter(storage).save([{ id: 'sample' }]);
  assert.equal(storage.getItem(STORAGE_KEY), '[{"id":"sample"}]');
  assert.deepEqual(new LocalStorageAdapter(storage).load(), [{ id: 'sample' }]);
});

test('invalid JSON does not prevent opening the list', () => {
  const storage = fakeStorage();
  storage.setItem(STORAGE_KEY, '{');
  assert.deepEqual(new LocalStorageAdapter(storage).load(), []);
});

test('a new service can read, search and remove a saved web booking', () => {
  const storage = fakeStorage();
  const createService = () => new BookingsService(new LocalStorageAdapter(storage));
  const result = createService().add({ player: 'Fox', zoneId: 'standard', pcNumber: 4, durationHours: 2 });
  assert.equal(result.ok, true);
  assert.deepEqual(createService().list('FOX'), [result.booking]);
  assert.equal(createService().remove(result.booking.id).ok, true);
  assert.deepEqual(createService().list(), []);
});
