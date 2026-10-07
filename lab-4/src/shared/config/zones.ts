export interface GamingZone {
  id: string;
  name: string;
  ratePerHour: number;
  totalPcs: number;
}

export const GAMING_ZONES: GamingZone[] = [
  { id: 'standard', name: 'Standard', ratePerHour: 60, totalPcs: 20 },
  { id: 'vip', name: 'VIP Lounge', ratePerHour: 90, totalPcs: 10 },
  { id: 'bootcamp', name: 'Boot Camp', ratePerHour: 120, totalPcs: 5 },
  { id: 'ps5', name: 'PlayStation 5', ratePerHour: 80, totalPcs: 4 },
];

export const STORAGE_KEY = 'cyberclub_bookings';
