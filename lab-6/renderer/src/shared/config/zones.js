/**
 * Конфігурація ігрових зон комп'ютерного клубу CyberClub.
 * Тарифи, кількість місць та колірні акценти для FSD-шару Shared.
 */
export const GAMING_ZONES = [
  {
    id: 'standard',
    name: 'Standard Zone (ПК #1-20)',
    shortName: 'Standard',
    ratePerHour: 60,
    pcRange: '1 - 20',
    totalPcs: 20,
    accentColor: '#38bdf8',
    bgBadge: 'rgba(56, 189, 248, 0.15)',
    borderBadge: '#0284c7',
  },
  {
    id: 'vip',
    name: 'VIP Lounge (ПК #21-30)',
    shortName: 'VIP Lounge',
    ratePerHour: 90,
    pcRange: '21 - 30',
    totalPcs: 10,
    accentColor: '#a855f7',
    bgBadge: 'rgba(168, 85, 247, 0.15)',
    borderBadge: '#7c3aed',
  },
  {
    id: 'bootcamp',
    name: 'Boot Camp 5x5 (Team Room)',
    shortName: 'Boot Camp',
    ratePerHour: 120,
    pcRange: '1 - 5',
    totalPcs: 5,
    accentColor: '#10b981',
    bgBadge: 'rgba(16, 185, 129, 0.15)',
    borderBadge: '#059669',
  },
  {
    id: 'ps5',
    name: 'PlayStation 5 Arena',
    shortName: 'PS5 Arena',
    ratePerHour: 80,
    pcRange: '1 - 4',
    totalPcs: 4,
    accentColor: '#06b6d4',
    bgBadge: 'rgba(6, 182, 212, 0.15)',
    borderBadge: '#0891b2',
  },
];

export function getZoneById(zoneId) {
  return GAMING_ZONES.find((z) => z.id === zoneId) || GAMING_ZONES[0];
}

export function getZoneByName(name) {
  return GAMING_ZONES.find((z) => z.name === name || z.shortName === name) || GAMING_ZONES[0];
}
