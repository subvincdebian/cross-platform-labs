export interface GamingZone {
  id: string;
  name: string;
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
    name: 'Standard Zone',
    ratePerHour: 60,
    totalPcs: 20,
    accent: {
      text: 'text-sky-400',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/20',
      dot: 'bg-sky-400',
    },
  },
  {
    id: 'vip',
    name: 'VIP Lounge',
    ratePerHour: 90,
    totalPcs: 10,
    accent: {
      text: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
      dot: 'bg-violet-400',
    },
  },
  {
    id: 'bootcamp',
    name: 'Boot Camp 5x5',
    ratePerHour: 120,
    totalPcs: 5,
    accent: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      dot: 'bg-emerald-400',
    },
  },
  {
    id: 'ps5',
    name: 'PlayStation 5',
    ratePerHour: 80,
    totalPcs: 4,
    accent: {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      dot: 'bg-amber-400',
    },
  },
];

export const STORAGE_KEY = 'cyberclub_bookings';
