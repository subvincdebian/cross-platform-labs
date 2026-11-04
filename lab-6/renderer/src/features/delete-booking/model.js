import { ipcBridge } from '../../shared/api/ipcBridge.js';

/**
 * FSD Feature: Видалення бронювання зі списку та збереження змін у файл через IPC.
 */
export async function deleteBookingFeature(currentList, bookingId) {
  const updatedList = currentList.filter((item) => item.id !== bookingId);

  // Синхронізація з файлом на диску через IPC
  await ipcBridge.saveBookings(updatedList);

  return {
    success: true,
    message: 'Бронювання видалено.',
    updatedList,
  };
}

/**
 * Перемикання статусу виконання бронювання (активне / виконано)
 */
export async function toggleBookingStatusFeature(currentList, bookingId) {
  const updatedList = currentList.map((item) => {
    if (item.id === bookingId) {
      return { ...item, done: !item.done };
    }
    return item;
  });

  await ipcBridge.saveBookings(updatedList);

  return {
    success: true,
    updatedList,
  };
}
