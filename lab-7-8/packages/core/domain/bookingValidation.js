import { findZone } from './zones.js';

export const MAX_DURATION_HOURS = 12;
export const MAX_PLAYER_LENGTH = 40;
export const ERROR_EMPTY = 'Введіть нікнейм гравця.';

export function validateBooking(input) {
  const { player, zoneId, pcNumber, durationHours } = input ?? {};

  if (typeof player !== 'string' || !player.trim()) return ERROR_EMPTY;
  if (player.trim().length > MAX_PLAYER_LENGTH) {
    return `Нікнейм має містити до ${MAX_PLAYER_LENGTH} символів.`;
  }

  const zone = findZone(zoneId);
  if (!zone) return 'Оберіть ігрову зону.';
  if (!Number.isInteger(pcNumber) || pcNumber < zone.first || pcNumber > zone.last) {
    return `Номер місця в зоні ${zone.name} має бути від ${zone.first} до ${zone.last}.`;
  }

  if (!Number.isInteger(durationHours) || durationHours < 1 || durationHours > MAX_DURATION_HOURS) {
    return `Тривалість сесії має бути від 1 до ${MAX_DURATION_HOURS} год.`;
  }

  return null;
}
