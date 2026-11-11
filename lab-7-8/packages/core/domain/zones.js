export const ZONES = Object.freeze([
  Object.freeze({ id: 'standard', name: 'Standard Zone', rate: 60, first: 1, last: 20 }),
  Object.freeze({ id: 'vip', name: 'VIP Lounge', rate: 90, first: 21, last: 30 }),
  Object.freeze({ id: 'bootcamp', name: 'Boot Camp 5x5', rate: 120, first: 1, last: 5 }),
  Object.freeze({ id: 'ps5', name: 'PS5 Arena', rate: 80, first: 1, last: 4 }),
]);

export function findZone(id) {
  return ZONES.find((zone) => zone.id === id);
}
