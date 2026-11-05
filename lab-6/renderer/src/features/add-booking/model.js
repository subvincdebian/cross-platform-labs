import { createBookingEntity } from '../../entities/booking/model.js';
import { getZoneById } from '../../shared/config/zones.js';
import { ipcBridge } from '../../shared/api/ipcBridge.js';

export async function addBookingFeature(currentList, payload) {
  const { player, zoneId, pcNumber, durationHours, notes } = payload;

  if (!player || player.trim().length === 0) {
    return {
      success: false,
      error: 'Будь ласка, введіть нікнейм гравця.',
    };
  }

  const zone = getZoneById(zoneId);
  const pc = parseInt(pcNumber, 10);
  if (isNaN(pc) || pc <= 0 || pc > zone.totalPcs) {
    return {
      success: false,
      error: `Номер ПК для зони "${zone.shortName}" має бути від 1 до ${zone.totalPcs}.`,
    };
  }

  const duration = parseInt(durationHours, 10);
  if (isNaN(duration) || duration <= 0) {
    return {
      success: false,
      error: 'Тривалість сесії має бути не менше 1 години.',
    };
  }

  const newBooking = createBookingEntity({
    player,
    zoneId,
    pcNumber: pc,
    durationHours: duration,
    notes,
  });

  const updatedList = [...currentList, newBooking];
  await ipcBridge.saveBookings(updatedList);

  return {
    success: true,
    message: 'Бронювання успішно додано та збережено у файл.',
    booking: newBooking,
    updatedList,
  };
}
