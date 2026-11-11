import test from 'node:test';
import assert from 'node:assert/strict';
import { ERROR_EMPTY, MAX_DURATION_HOURS, MAX_PLAYER_LENGTH, validateBooking } from '@cyberclub/core';

const valid = { player: '  Nova  ', zoneId: 'standard', pcNumber: 1, durationHours: 1 };

test('accepts a valid booking and the duration limit', () => {
  assert.equal(validateBooking(valid), null);
  assert.equal(validateBooking({ ...valid, durationHours: MAX_DURATION_HOURS }), null);
});

test('rejects missing, whitespace-only and non-string names', () => {
  for (const player of ['', '  ', null, 20]) assert.equal(validateBooking({ ...valid, player }), ERROR_EMPTY);
  assert.equal(validateBooking(), ERROR_EMPTY);
});

test('checks trimmed player length at the boundary', () => {
  assert.equal(validateBooking({ ...valid, player: ' x'.trim().repeat(MAX_PLAYER_LENGTH) + ' ' }), null);
  assert.match(validateBooking({ ...valid, player: 'x'.repeat(MAX_PLAYER_LENGTH + 1) }), /Нікнейм/);
});

test('rejects unknown zones', () => {
  assert.match(validateBooking({ ...valid, zoneId: 'missing' }), /зону/);
});

test('checks station bounds for the selected zone', () => {
  assert.equal(validateBooking({ ...valid, zoneId: 'vip', pcNumber: 21 }), null);
  assert.equal(validateBooking({ ...valid, zoneId: 'vip', pcNumber: 30 }), null);
  for (const pcNumber of [20, 31, 21.5, '21']) {
    assert.match(validateBooking({ ...valid, zoneId: 'vip', pcNumber }), /21 до 30/);
  }
});

test('rejects fractional, zero and over-limit durations', () => {
  for (const durationHours of [0, 1.5, NaN, MAX_DURATION_HOURS + 1]) {
    assert.match(validateBooking({ ...valid, durationHours }), new RegExp(`до ${MAX_DURATION_HOURS} год`));
  }
});
