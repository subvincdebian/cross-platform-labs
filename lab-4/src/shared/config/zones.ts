export interface GamingZone {
  id: string;
  name: string;
  shortName: string;
  ratePerHour: number;
  totalPcs: number;
  accent: {
    text: string;
    bg: string;
    border: string;
    dot: string;
  };
}

export const GAMING_ZONES: GamingZone[] = [
  {
    id: 'standard',
    name: 'Standard Zone (ПК #1-20)',
    shortName: 'Standard',
    ratePerHour: 60,
    totalPcs: 20,
    accent: {
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      dot: 'bg-blue-400',
    },
  },
  {
    id: 'vip',
    name: 'VIP Lounge (ПК #21-30)',
    shortName: 'VIP Lounge',
    ratePerHour: 90,
    totalPcs: 10,
    accent: {
      text: 'text-purple-300',
      bg: 'bg-purple-500/15',
      border: 'border-purple-500/30',
      dot: 'bg-purple-400',
    },
  },
  {
    id: 'bootcamp',
    name: 'Boot Camp 5x5 (Team Room)',
    shortName: 'Boot Camp',
    ratePerHour: 120,
    totalPcs: 5,
    accent: {
      text: 'text-emerald-300',
      bg: 'bg-emerald-500/15',
      border: 'border-emerald-500/30',
      dot: 'bg-emerald-400',
    },
  },
  {
    id: 'ps5',
    name: 'PlayStation 5 Arena (#1-4)',
    shortName: 'PS5 Arena',
    ratePerHour: 80,
    totalPcs: 4,
    accent: {
      text: 'text-amber-300',
      bg: 'bg-amber-500/15',
      border: 'border-amber-500/30',
      dot: 'bg-amber-400',
    },
  },
];

export const STORAGE_KEY = 'cyberclub_bookings';
