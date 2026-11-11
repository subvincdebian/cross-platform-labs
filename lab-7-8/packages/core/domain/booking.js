import { findZone } from './zones.js';

const dateFormat = new Intl.DateTimeFormat('uk-UA', { timeZone: 'Europe/Kyiv' });

export function createBooking(input, id, createdAt) {
  const zone = findZone(input.zoneId);
  return {
    id,
    player: input.player.trim(),
    zoneId: zone.id,
    zoneName: zone.name,
    pcNumber: input.pcNumber,
    durationHours: input.durationHours,
    price: input.durationHours * zone.rate,
    createdAt,
  };
}

export function formatBookingDate(value) {
  const date = typeof value === 'string' ? new Date(value) : new Date(NaN);
  return Number.isNaN(date.getTime()) ? '' : dateFormat.format(date);
}

export function sortBookings(bookings) {
  return [...bookings].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function filterBookings(bookings, query) {
  const needle = query.trim().toLowerCase();
  return bookings.filter(({ player, zoneName, pcNumber }) =>
    [player, zoneName, String(pcNumber)].some((value) => value.toLowerCase().includes(needle)),
  );
}

export function sanitizeBookings(data) {
  if (!Array.isArray(data)) return [];

  // A new duration limit must not hide bookings that were valid when saved.
  return data.filter((booking) => booking &&
    typeof booking.id === 'string' && booking.id.length > 0 &&
    typeof booking.player === 'string' && booking.player.trim().length > 0 &&
    typeof booking.zoneId === 'string' && typeof booking.zoneName === 'string' &&
    Number.isInteger(booking.pcNumber) && booking.pcNumber > 0 &&
    Number.isInteger(booking.durationHours) && booking.durationHours > 0 &&
    Number.isFinite(booking.price) && booking.price > 0 &&
    typeof booking.createdAt === 'string' && Number.isFinite(Date.parse(booking.createdAt)));
}
