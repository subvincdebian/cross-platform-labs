/**
 * FSD Shared API: Клієнт взаємодії з головним процесом Electron через IPC.
 * Реалізує шаблон адаптера з автоматичним переключенням між cyberClubAPI та notesAPI.
 */
export const ipcBridge = {
  /**
   * Завантаження збережених записів із файлу на диску через IPC
   * @returns {Promise<Array>}
   */
  async loadBookings() {
    if (window.cyberClubAPI?.loadBookings) {
      try {
        const data = await window.cyberClubAPI.loadBookings();
        return Array.isArray(data) ? data : [];
      } catch (err) {
        console.error('[ipcBridge] Помилка виклику cyberClubAPI.loadBookings:', err);
      }
    }

    if (window.notesAPI?.loadNotes) {
      try {
        const data = await window.notesAPI.loadNotes();
        return Array.isArray(data) ? data : [];
      } catch (err) {
        console.error('[ipcBridge] Помилка виклику notesAPI.loadNotes:', err);
      }
    }

    // Резервний fallback для автономного запуску без Electron
    console.warn('[ipcBridge] IPC міст недоступний, використовується локальне сховище');
    try {
      const raw = localStorage.getItem('cyberclub_bookings');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  /**
   * Збереження оновленого масиву записів у файл на диску через IPC
   * @param {Array} bookings
   * @returns {Promise<boolean>}
   */
  async saveBookings(bookings) {
    if (window.cyberClubAPI?.saveBookings) {
      try {
        return await window.cyberClubAPI.saveBookings(bookings);
      } catch (err) {
        console.error('[ipcBridge] Помилка виклику cyberClubAPI.saveBookings:', err);
      }
    }

    if (window.notesAPI?.saveNotes) {
      try {
        return await window.notesAPI.saveNotes(bookings);
      } catch (err) {
        console.error('[ipcBridge] Помилка виклику notesAPI.saveNotes:', err);
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
