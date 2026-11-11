import { formatBookingDate, ZONES } from '@cyberclub/core';

export function createHandlers(service) {
  return {
    list(query = '') {
      if (typeof query !== 'string') throw new TypeError('Запит пошуку має бути рядком.');

      const bookings = service.list(query).map((booking) => ({
        ...booking,
        dateLabel: formatBookingDate(booking.createdAt),
      }));
      return { bookings, zones: ZONES };
    },
    add(input) {
      if (!input || typeof input !== 'object' || Array.isArray(input)) {
        return { ok: false, error: 'Некоректні дані бронювання.' };
      }
      return service.add(input);
    },
    remove(id) {
      if (typeof id !== 'string' || !id) {
        return { ok: false, error: 'Некоректний ідентифікатор бронювання.' };
      }
      return service.remove(id);
    },
  };
}
