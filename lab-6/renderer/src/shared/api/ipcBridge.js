/**
 * FSD Shared API: Клієнт взаємодії з головним процесом Electron через IPC.
 * Працює виключно з API кіберспортивного клубу window.cyberClubAPI.
 */
export const ipcBridge = {
  /**
   * Завантаження збережених бронювань із файлу bookings.json через IPC
   * @returns {Promise<Array>}
   */
  async loadBookings() {
    if (window.cyberClubAPI?.loadBookings) {
      try {
        const data = await window.cyberClubAPI.loadBookings();
        return Array.isArray(data) ? data : [];
      } catch (err) {
        console.error('[ipcBridge] Помилка виклику cyberClubAPI.loadBookings:', err);
        return [];
      }
    }

    // Резервний fallback для автономного браузерного тестування
    console.warn('[ipcBridge] IPC міст недоступний, використовується локальне сховище');
    try {
      const raw = localStorage.getItem('cyberclub_bookings');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  /**
   * Збереження оновленого масиву бронювань у файл bookings.json через IPC
   * @param {Array} bookings
   * @returns {Promise<boolean>}
   */
  async saveBookings(bookings) {
    if (window.cyberClubAPI?.saveBookings) {
      try {
        return await window.cyberClubAPI.saveBookings(bookings);
      } catch (err) {
        console.error('[ipcBridge] Помилка виклику cyberClubAPI.saveBookings:', err);
        return false;
      }
    }

    try {
      localStorage.setItem('cyberclub_bookings', JSON.stringify(bookings));
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Отримання метаданих додатка
   * @returns {Promise<Object>}
   */
  async getAppInfo() {
    if (window.cyberClubAPI?.getAppInfo) {
      return await window.cyberClubAPI.getAppInfo();
    }
    return { name: 'cyberclub-desktop', version: '1.0.0' };
  },
};
