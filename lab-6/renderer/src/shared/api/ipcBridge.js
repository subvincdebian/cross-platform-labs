export const ipcBridge = {
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

    try {
      const raw = localStorage.getItem('cyberclub_bookings');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

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

  async getAppInfo() {
    if (window.cyberClubAPI?.getAppInfo) {
      return await window.cyberClubAPI.getAppInfo();
    }
    return { name: 'cyberclub-desktop', version: '1.0.0' };
  },
};
