export interface Booking {
  id: string;
  playerName: string;
  zoneId: string;
  zoneName: string;
  pcNumber: number;
  durationHours: number;
  price: number;
  notes?: string;
  done: boolean;
  createdAt: string;
}

export type NewBookingPayload = Omit<Booking, 'id' | 'createdAt'>;

export type BookingStatusFilter = 'all' | 'active' | 'completed';
