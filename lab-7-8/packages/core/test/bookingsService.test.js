import test from 'node:test';
import assert from 'node:assert/strict';
import { BookingsService, ERROR_EMPTY, MemoryStorageAdapter } from '@cyberclub/core';

const input = { player: 'Nova', zoneId: 'standard', pcNumber: 8, durationHours: 2 };

test('starts with no records and persists a valid booking through the port', () => {
  const storage = new MemoryStorageAdapter();
  const service = new BookingsService(storage);
  assert.deepEqual(service.list(), []);
  const result = service.add(input);
  assert.equal(result.ok, true);
  assert.deepEqual(new BookingsService(storage).list('NOVA'), [result.booking]);
});

test('invalid input does not touch storage', () => {
  const unexpected = () => assert.fail('Invalid input accessed storage');
  const service = new BookingsService({ load: unexpected, save: unexpected });
  assert.deepEqual(service.add({ ...input, player: '  ' }), { ok: false, error: ERROR_EMPTY });
});

test('generates distinct IDs for successive additions', () => {
  const service = new BookingsService(new MemoryStorageAdapter());
  assert.notEqual(service.add(input).booking.id, service.add(input).booking.id);
});

test('removes an existing ID and reports a missing ID', () => {
  const service = new BookingsService(new MemoryStorageAdapter());
  const { booking } = service.add(input);
  assert.deepEqual(service.remove(booking.id), { ok: true });
  assert.equal(service.remove(booking.id).ok, false);
  assert.deepEqual(service.list(), []);
});

test('surfaces a failed save and allows a retry', () => {
  const storage = new MemoryStorageAdapter();
  const service = new BookingsService({
    load: () => storage.load(),
    save: () => { throw new Error('write failed'); },
  });
  assert.throws(() => service.add(input), /write failed/);
  assert.deepEqual(service.list(), []);
  assert.equal(new BookingsService(storage).add(input).ok, true);
});
