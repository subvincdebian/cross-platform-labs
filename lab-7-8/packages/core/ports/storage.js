export class BookingStorageAdapter {
  load() {
    throw new Error('Метод load() не реалізовано.');
  }

  save() {
    throw new Error('Метод save() не реалізовано.');
  }
}

export class MemoryStorageAdapter extends BookingStorageAdapter {
  #bookings = [];

  load() {
    return structuredClone(this.#bookings);
  }

  save(bookings) {
    this.#bookings = structuredClone(bookings);
  }
}
