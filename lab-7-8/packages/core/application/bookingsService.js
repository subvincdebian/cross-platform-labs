import { createBooking, filterBookings, sortBookings, sanitizeBookings } from '../domain/booking.js';
import { validateBooking } from '../domain/bookingValidation.js';

export class BookingsService {
  constructor(storage) {
    this.storage = storage;
  }

  list(query = '') {
    return sortBookings(filterBookings(sanitizeBookings(this.storage.load()), query));
  }

  add(input) {
    const error = validateBooking(input);
    if (error) return { ok: false, error };

    const bookings = this.list();
    const booking = createBooking(input, crypto.randomUUID(), new Date().toISOString());
    this.storage.save([booking, ...bookings]);
    return { ok: true, booking };
  }

  remove(id) {
    const bookings = this.list();
    const remaining = bookings.filter((booking) => booking.id !== id);
    if (remaining.length === bookings.length) return { ok: false, error: 'Бронювання не знайдено.' };

    this.storage.save(remaining);
    return { ok: true };
  }
}
