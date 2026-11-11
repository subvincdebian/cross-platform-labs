import test from 'node:test';
import assert from 'node:assert/strict';
import { createBooking, filterBookings, formatBookingDate, sanitizeBookings, sortBookings } from '@cyberclub/core';

const input = { player: ' Nova ', zoneId: 'vip', pcNumber: 23, durationHours: 3 };
const earlier = createBooking(input, 'first', '2026-01-02T12:00:00Z');
const later = createBooking({ ...input, player: 'Rex' }, 'second', '2026-02-03T12:00:00Z');

test('trims name and calculates the price from the zone rate', () => {
  assert.equal(earlier.player, 'Nova');
  assert.equal(earlier.price, 270);
});

test('formats Kyiv date and returns empty for invalid values', () => {
  assert.equal(formatBookingDate('2026-01-02T23:00:00Z'), '03.01.2026');
  assert.equal(formatBookingDate('invalid'), '');
  assert.equal(formatBookingDate(null), '');
});

test('sorts by creation date without mutating the source', () => {
  const input = [earlier, later];
  assert.deepEqual(sortBookings(input), [later, earlier]);
  assert.deepEqual(input, [earlier, later]);
});

test('searches by name, zone and station without case sensitivity', () => {
  assert.deepEqual(filterBookings([earlier, later], ' NOVa '), [earlier]);
  assert.deepEqual(filterBookings([earlier, later], 'lounge'), [earlier, later]);
  assert.deepEqual(filterBookings([earlier, later], '23'), [earlier, later]);
  assert.deepEqual(filterBookings([earlier, later], 'absent'), []);
});

test('ignores malformed rows and retains older bookings above the current cap', () => {
  const old = { ...earlier, durationHours: 15, price: 1350 };
  assert.deepEqual(sanitizeBookings([null, {}, { ...earlier, createdAt: 'bad' }, old]), [old]);
  assert.deepEqual(sanitizeBookings({}), []);
});
