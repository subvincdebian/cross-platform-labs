import { ipcBridge } from '../../shared/api/ipcBridge.js';

export async function deleteBookingFeature(currentList, bookingId) {
  const updatedList = currentList.filter((item) => item.id !== bookingId);
  await ipcBridge.saveBookings(updatedList);

  return {
    success: true,
    message: 'Бронювання видалено.',
    updatedList,
  };
}

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
