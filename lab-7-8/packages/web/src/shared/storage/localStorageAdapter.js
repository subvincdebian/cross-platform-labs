import { BookingStorageAdapter } from '@cyberclub/core';

export const STORAGE_KEY = 'cyberclub-bookings';

export class LocalStorageAdapter extends BookingStorageAdapter {
  constructor(storage) {
    super();
    this.storage = storage;
  }

  load() {
    const raw = (this.storage ?? localStorage).getItem(STORAGE_KEY);
    try {
      return JSON.parse(raw ?? '[]');
    } catch (error) {
      if (error instanceof SyntaxError) return [];
      throw error;
    }
  }

  save(bookings) {
    (this.storage ?? localStorage).setItem(STORAGE_KEY, JSON.stringify(bookings));
  }
}
