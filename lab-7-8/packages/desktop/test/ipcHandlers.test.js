import test from 'node:test';
import assert from 'node:assert/strict';
import { BookingsService, ERROR_EMPTY, MAX_DURATION_HOURS, MemoryStorageAdapter } from '@cyberclub/core';
import { createHandlers } from '../ipcHandlers.js';

const input = { player: 'Rex', zoneId: 'ps5', pcNumber: 2, durationHours: 2 };
const fixture = () => createHandlers(new BookingsService(new MemoryStorageAdapter()));

test('adds a booking and returns matching rows with a display date', () => {
  const handlers = fixture();
  const { ok, booking } = handlers.add(input);
  assert.equal(ok, true);
  const { bookings, zones } = handlers.list('rEx');
  assert.equal(bookings[0].id, booking.id);
  assert.match(bookings[0].dateLabel, /^\d{2}\.\d{2}\.\d{4}$/);
  assert.equal(zones.length, 4);
});

test('rejects malformed IPC payloads', () => {
  const handlers = fixture();
  assert.throws(() => handlers.list(7), TypeError);
  assert.equal(handlers.add([]).ok, false);
  assert.equal(handlers.remove(7).ok, false);
});

test('returns business validation errors from the same core', () => {
  const handlers = fixture();
  assert.equal(handlers.add({ ...input, player: '' }).error, ERROR_EMPTY);
  assert.match(handlers.add({ ...input, durationHours: MAX_DURATION_HOURS + 1 }).error, /Тривалість/);
  assert.deepEqual(handlers.list().bookings, []);
});

test('removes a record by ID and reports a repeated removal', () => {
  const handlers = fixture();
  const { booking } = handlers.add(input);
  assert.deepEqual(handlers.remove(booking.id), { ok: true });
  assert.equal(handlers.remove(booking.id).ok, false);
  assert.deepEqual(handlers.list().bookings, []);
});
