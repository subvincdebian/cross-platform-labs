import { ipcBridge } from '../shared/api/ipcBridge.js';
import { notificationService } from '../shared/ui/notification.js';
import { normalizeBooking } from '../entities/booking/model.js';
import { addBookingFeature } from '../features/add-booking/model.js';
import { deleteBookingFeature, toggleBookingStatusFeature } from '../features/delete-booking/model.js';
import { updateHeaderWidget } from '../widgets/header/ui.js';
import { initBookingFormWidget } from '../widgets/booking-form/ui.js';
import { initBookingListWidget } from '../widgets/booking-list/ui.js';

/**
 * FSD App Layer: Головний модуль ініціалізації та координації стану застосунку CyberClub.
 */
export async function bootstrapApp() {
  const statusMessageEl = document.getElementById('statusMessage');

  // Внутрішній стан списку бронювань
  let bookings = [];

  // 1. Завантаження збережених даних із bookings.json через IPC
  try {
    const rawData = await ipcBridge.loadBookings();
    bookings = Array.isArray(rawData)
      ? rawData.map(normalizeBooking).filter(Boolean)
      : [];
    console.log('[FSD:App] Завантажено бронювань із файлу bookings.json:', bookings.length);
  } catch (err) {
    console.error('[FSD:App] Помилка завантаження даних:', err);
    bookings = [];
  }

  // 2. Ініціалізація віджета списку
  const listWidget = initBookingListWidget({
    onToggle: async (id) => {
      const res = await toggleBookingStatusFeature(bookings, id);
      if (res.success) {
        bookings = res.updatedList;
        syncUI();
      }
    },
    onDelete: async (id) => {
      const res = await deleteBookingFeature(bookings, id);
      if (res.success) {
        bookings = res.updatedList;
        syncUI();
        notificationService.show(statusMessageEl, res.message, 'warning');
      }
    },
  });

  listWidget.bindEvents(() => {
    listWidget.render(bookings);
  });

  // 3. Ініціалізація віджета форми
  initBookingFormWidget({
    onAdd: async (payload) => {
      const res = await addBookingFeature(bookings, payload);
      if (!res.success) {
        notificationService.show(statusMessageEl, res.error, 'error');
        return { success: false };
      }

      bookings = res.updatedList;
      syncUI();
      notificationService.show(statusMessageEl, res.message, 'success');
      return { success: true };
    },
  });

  // Синхронізація UI (список та лічильники в шапці)
  function syncUI() {
    listWidget.render(bookings);
    updateHeaderWidget(bookings);
  }

  // Початковий рендеринг
  syncUI();

  // Доступ до стану у window для налагодження
  window.cyberClubState = {
    getBookings: () => bookings,
    syncUI,
  };

  return {
    getBookings: () => bookings,
    syncUI,
  };
}
