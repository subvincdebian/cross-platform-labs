import { getZoneById } from '../../shared/config/zones.js';

/**
 * FSD Entity UI: Побудова DOM-елемента картки бронювання в списку.
 */
export function createBookingItemElement(booking, { onToggle, onDelete }) {
  const zone = getZoneById(booking.zoneId);
  const li = document.createElement('li');
  li.className = `booking-item note-item ${booking.done ? 'item-done' : ''}`;
  li.dataset.id = booking.id;

  // Лівий контейнер із вмістом
  const infoDiv = document.createElement('div');
  infoDiv.className = 'booking-info';

  // Верхній рядок: нікнейм, бейдж зони, статус
  const headerRow = document.createElement('div');
  headerRow.className = 'booking-card-header';

  const nickSpan = document.createElement('span');
  nickSpan.className = `player-nick ${booking.done ? 'text-done' : ''}`;
  nickSpan.textContent = booking.player;

  const zoneSpan = document.createElement('span');
  zoneSpan.className = 'zone-badge';
  zoneSpan.style.borderColor = zone.borderBadge;
  zoneSpan.style.backgroundColor = zone.bgBadge;
  zoneSpan.style.color = zone.accentColor;
  zoneSpan.textContent = zone.shortName || booking.zoneName;

  const statusBadge = document.createElement('span');
  statusBadge.className = `status-badge ${booking.done ? 'badge-completed' : 'badge-active'}`;
  statusBadge.textContent = booking.done ? 'Виконано' : 'Активне';

  headerRow.appendChild(nickSpan);
  headerRow.appendChild(zoneSpan);
  headerRow.appendChild(statusBadge);

  // Нижній рядок: деталі тарифікації та примітка
  const detailsRow = document.createElement('div');
  detailsRow.className = 'booking-card-details';

  const detailsSpan = document.createElement('span');
  detailsSpan.className = 'booking-details note-text';
  detailsSpan.textContent = `ПК #${booking.pcNumber} · ${booking.durationHours} год · ${booking.price} ₴`;

  detailsRow.appendChild(detailsSpan);

  if (booking.notes) {
    const notesSpan = document.createElement('span');
    notesSpan.className = 'booking-notes';
    notesSpan.textContent = `«${booking.notes}»`;
    detailsRow.appendChild(notesSpan);
  }

  infoDiv.appendChild(headerRow);
  infoDiv.appendChild(detailsRow);

  // Клік на тіло картки перемикає статус
  infoDiv.style.cursor = 'pointer';
  infoDiv.title = 'Натисніть для перемикання статусу (Активне / Виконано)';
  infoDiv.addEventListener('click', () => {
    if (onToggle) onToggle(booking.id);
  });

  // Правий контейнер: кнопка видалення
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'booking-actions';

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'cancel-btn delete-button';
  deleteBtn.textContent = 'Видалити';
  deleteBtn.title = 'Видалити бронювання зі списку та зберегти зміни у файл';
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(booking.id);
  });

  actionsDiv.appendChild(deleteBtn);

  li.appendChild(infoDiv);
  li.appendChild(actionsDiv);

  return li;
}
