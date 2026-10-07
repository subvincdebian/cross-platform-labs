export interface GamingZone {
  id: string;
  name: string;
  ratePerHour: number;
  description: string;
  badgeColor: string;
  totalPcs: number;
}

export const GAMING_ZONES: GamingZone[] = [
  {
    id: 'standard',
    name: 'Standard Zone (ПК #1-20)',
    ratePerHour: 60,
    description: 'Intel i5 / RTX 4060 / 240Hz / Ігрова периферія Hator',
    badgeColor: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
    totalPcs: 20,
  },
  {
    id: 'vip',
    name: 'VIP Lounge (ПК #21-30)',
    ratePerHour: 90,
    description: 'Intel i7 / RTX 4070 Ti / 360Hz / Крісла DXRacer / HyperX',
    badgeColor: 'border-purple-500/40 bg-purple-500/10 text-purple-400',
    totalPcs: 10,
  },
  {
    id: 'bootcamp',
    name: 'Boot Camp 5x5 (Team Room)',
    ratePerHour: 120,
    description: 'Командна кімната / Звукоізоляція / 500 FPS / Logitech G Pro',
    badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    totalPcs: 5,
  },
  {
    id: 'ps5',
    name: 'PlayStation 5 Arena (#1-4)',
    ratePerHour: 80,
    description: 'Sony PS5 / OLED TV 65" 120Hz / DualSense / FC 25 & MK1',
    badgeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    totalPcs: 4,
  },
];

export const STORAGE_KEY = 'cyberclub_bookings';
