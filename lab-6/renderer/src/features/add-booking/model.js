import { createBookingEntity } from '../../entities/booking/model.js';
import { getZoneById } from '../../shared/config/zones.js';
import { ipcBridge } from '../../shared/api/ipcBridge.js';

/**
 * FSD Feature: Додавання нового бронювання з валідацією та збереженням у файл через IPC.
 */
export async function addBookingFeature(currentList, payload) {
  const { player, zoneId, pcNumber, durationHours, notes } = payload;

  // 1. Валідація на порожнє поле або рядок із самих лише пробілів (Крок 2 методички)
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

  // 2. Створення нової сутності
  const newBooking = createBookingEntity({
    player,
    zoneId,
    pcNumber: pc,
    durationHours: duration,
    notes,
  });

  // 3. Додавання у кінець списку за вимогою Кроку 3 методички
  const updatedList = [...currentList, newBooking];

  // 4. Синхронізація з файлом на диску через IPC
  const saved = await ipcBridge.saveBookings(updatedList);
  if (!saved) {
    console.warn('[addBookingFeature] Попередження: запис у файл повернув false');
  }

  return {
    success: true,
    message: 'Бронювання успішно додано та збережено у файл.',
    booking: newBooking,
    updatedList,
  };
}
