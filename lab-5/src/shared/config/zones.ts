export interface GamingZone {
  id: string;
  name: string;
  shortName: string;
  ratePerHour: number;
  totalPcs: number;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const GAMING_ZONES: GamingZone[] = [
  {
    id: 'standard',
    name: 'Standard Zone (ПК #1-20)',
    shortName: 'Standard',
    ratePerHour: 60,
    totalPcs: 20,
    color: '#2563eb',
    bgColor: '#dbeafe',
    borderColor: '#93c5fd',
  },
  {
    id: 'vip',
    name: 'VIP Lounge (ПК #21-30)',
    shortName: 'VIP Lounge',
    ratePerHour: 90,
    totalPcs: 10,
    color: '#7c3aed',
    bgColor: '#ede9fe',
    borderColor: '#c4b5fd',
  },
  {
    id: 'bootcamp',
    name: 'Boot Camp 5x5 (Team Room)',
    shortName: 'Boot Camp',
    ratePerHour: 120,
    totalPcs: 5,
    color: '#059669',
    bgColor: '#d1fae5',
    borderColor: '#6ee7b7',
  },
  {
    id: 'ps5',
    name: 'PlayStation 5 Arena (#1-4)',
    shortName: 'PS5 Arena',
    ratePerHour: 80,
    totalPcs: 4,
    color: '#0284c7',
    bgColor: '#e0f2fe',
    borderColor: '#7dd3fc',
  },
];
