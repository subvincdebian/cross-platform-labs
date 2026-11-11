import { BookingStorageAdapter } from '@cyberclub/core';
import { mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

export class FileStorageAdapter extends BookingStorageAdapter {
  constructor(file) {
    super();
    this.file = file;
  }

  load() {
    try {
      return JSON.parse(readFileSync(this.file, 'utf8'));
    } catch (error) {
      if (error.code === 'ENOENT' || error instanceof SyntaxError) return [];
      throw error;
    }
  }

  save(bookings) {
    mkdirSync(dirname(this.file), { recursive: true });
    const temporary = `${this.file}.${crypto.randomUUID()}.tmp`;
    try {
      writeFileSync(temporary, JSON.stringify(bookings, null, 2), { flag: 'wx' });
      renameSync(temporary, this.file);
    } finally {
      rmSync(temporary, { force: true });
    }
  }
}
