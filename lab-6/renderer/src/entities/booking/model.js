import { getZoneById } from '../../shared/config/zones.js';

/**
 * FSD Entity: Модель даних бронювання CyberClub.
 */
export function createBookingEntity({
  player,
  zoneId = 'standard',
  pcNumber = 1,
  durationHours = 2,
  notes = '',
}) {
  const zone = getZoneById(zoneId);
  const duration = Math.max(1, parseInt(durationHours, 10) || 1);
  const pc = Math.max(1, parseInt(pcNumber, 10) || 1);
  const price = duration * zone.ratePerHour;
  const timestamp = Date.now();

  const formattedText = `${player} - ${zone.name} (ПК #${pc}, ${duration} год, ${price} ₴)`;

  return {
    id: timestamp,
    player: player.trim(),
    zoneId: zone.id,
    zoneName: zone.name,
    pcNumber: pc,
    durationHours: duration,
    price,
    notes: notes.trim(),
    text: formattedText,
    done: false,
    createdAt: new Date().toISOString(),
  };
}

export function normalizeBooking(raw) {
  if (!raw || typeof raw !== 'object') return null;

  const id = raw.id || Date.now();
  const player = raw.player || raw.playerName || raw.text || 'Гість';
  const zoneId = raw.zoneId || 'standard';
  const zone = getZoneById(zoneId);
  const duration = raw.durationHours || raw.duration || 2;
  const price = raw.price || duration * zone.ratePerHour;

  return {
    id,
    player,
    zoneId: zone.id,
    zoneName: raw.zoneName || zone.name,
    pcNumber: raw.pcNumber || 1,
    durationHours: duration,
    price,
    notes: raw.notes || '',
    text: raw.text || `${player} - ${zone.name} (ПК #${raw.pcNumber || 1}, ${duration} год, ${price} ₴)`,
    done: Boolean(raw.done),
    createdAt: raw.createdAt || new Date().toISOString(),
  };
}
