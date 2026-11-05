import { getZoneById } from '../../shared/config/zones.js';

export function createBookingItemElement(booking, { onToggle, onDelete }) {
  const zone = getZoneById(booking.zoneId);
  const li = document.createElement('li');
  li.className = `flex items-center justify-between p-3.5 rounded-lg border transition cursor-pointer ${
    booking.done
      ? 'bg-emerald-950/30 border-emerald-900/60 border-l-4 border-l-emerald-500 opacity-80'
      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 border-l-4 border-l-cyan-500'
  }`;
  li.dataset.id = booking.id;

  const infoDiv = document.createElement('div');
  infoDiv.className = 'flex-1 mr-3';

  const headerRow = document.createElement('div');
  headerRow.className = 'flex items-center gap-2 mb-1 flex-wrap';

  const nickSpan = document.createElement('span');
  nickSpan.className = `player-nick font-bold text-[15px] ${booking.done ? 'line-through text-emerald-300' : 'text-sky-400'}`;
  nickSpan.textContent = booking.player;

  const zoneSpan = document.createElement('span');
  zoneSpan.className = 'zone-badge inline-block text-[11px] font-bold px-2 py-0.5 rounded border';
  zoneSpan.style.borderColor = zone.borderBadge;
  zoneSpan.style.backgroundColor = zone.bgBadge;
  zoneSpan.style.color = zone.accentColor;
  zoneSpan.textContent = zone.shortName || booking.zoneName;

  const statusBadge = document.createElement('span');
  statusBadge.className = `text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
    booking.done
      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
      : 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
  }`;
  statusBadge.textContent = booking.done ? 'Виконано' : 'Активне';

  headerRow.appendChild(nickSpan);
  headerRow.appendChild(zoneSpan);
  headerRow.appendChild(statusBadge);

  const detailsRow = document.createElement('div');
  detailsRow.className = 'flex items-center gap-2.5 text-xs text-slate-300 flex-wrap';

  const detailsSpan = document.createElement('span');
  detailsSpan.className = 'booking-details font-medium';
  detailsSpan.textContent = `ПК #${booking.pcNumber} · ${booking.durationHours} год · ${booking.price} ₴`;

  detailsRow.appendChild(detailsSpan);

  if (booking.notes) {
    const notesSpan = document.createElement('span');
    notesSpan.className = 'text-slate-400 italic text-[11.5px]';
    notesSpan.textContent = `«${booking.notes}»`;
    detailsRow.appendChild(notesSpan);
  }

  infoDiv.appendChild(headerRow);
  infoDiv.appendChild(detailsRow);

  infoDiv.title = 'Натисніть для перемикання статусу (Активне / Виконано)';
  infoDiv.addEventListener('click', () => {
    if (onToggle) onToggle(booking.id);
  });

  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'flex items-center gap-2';

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-button px-3.5 py-1.5 bg-red-600 hover:bg-red-500 active:scale-95 text-white rounded-md text-xs font-bold transition cursor-pointer';
  deleteBtn.textContent = 'Видалити';
  deleteBtn.title = 'Видалити бронювання';
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(booking.id);
  });

  actionsDiv.appendChild(deleteBtn);

  li.appendChild(infoDiv);
  li.appendChild(actionsDiv);

  return li;
}
