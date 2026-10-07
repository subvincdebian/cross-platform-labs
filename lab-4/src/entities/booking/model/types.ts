export interface Booking {
  id: string;
  playerName: string;
  zoneId: string;
  zoneName: string;
  date: string;
  startTime: string;
  pcNumber: number;
  durationHours: number;
  price: number;
  notes?: string;
  done: boolean;
  createdAt: string;
}

export type BookingStatusFilter = 'all' | 'active' | 'completed';

export interface BookingFiltersState {
  search: string;
  status: BookingStatusFilter;
  zoneId: string;
}
