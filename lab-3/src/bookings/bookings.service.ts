import { Injectable } from '@nestjs/common';
import { Booking } from './models/booking.model';
import { User } from '../users/models/user.model';

@Injectable()
export class BookingsService {
  private bookings: Booking[] = [
    {
      id: '1',
      zone: 'VIP Lounge (ПК #21-30)',
      pcNumber: 22,
      durationHours: 3,
      price: 240,
      status: 'active',
      notes: 'Ігровий монітор 360Hz та навушники HyperX',
      user: {
        id: '1',
        name: 's1mple_pro',
        email: 's1mple@cyberclub.ua',
      },
      get author() {
        return this.user;
      },
    },
  ];

  private currentId = 1;

  async findAll(): Promise<Booking[]> {
    return this.bookings;
  }

  async findById(id: string): Promise<Booking | undefined> {
    return this.bookings.find((b) => b.id === id);
  }

  async create(
    zone: string,
    pcNumber: number,
    durationHours: number,
    price: number,
    notes: string | undefined,
    user: User,
  ): Promise<Booking> {
    this.currentId += 1;
    const newBooking: Booking = {
      id: this.currentId.toString(),
      zone,
      pcNumber,
      durationHours,
      price,
      status: 'active',
      notes: notes || '',
      user: { id: user.id, name: user.name, email: user.email },
      get author() {
        return this.user;
      },
    };
    this.bookings.push(newBooking);
    return newBooking;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.bookings.findIndex((b) => b.id === id);
    if (index === -1) {
      return false;
    }
    this.bookings.splice(index, 1);
    return true;
  }
}
