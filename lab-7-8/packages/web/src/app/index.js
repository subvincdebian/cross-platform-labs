import { mountBookingForm } from '../widgets/booking-form/ui.js';
import { renderBookingList } from '../widgets/booking-list/ui.js';
import { BookingsService, formatBookingDate, ZONES } from '@cyberclub/core';
import { LocalStorageAdapter, STORAGE_KEY } from '../shared/storage/localStorageAdapter.js';

const service = new BookingsService(new LocalStorageAdapter());
const client = {
  list(query) {
    const bookings = service.list(query).map((booking) => ({
      ...booking,
      dateLabel: formatBookingDate(booking.createdAt),
    }));
    return { bookings, zones: ZONES };
  },
  add: (input) => navigator.locks.request(STORAGE_KEY, () => service.add(input)),
  remove: (id) => navigator.locks.request(STORAGE_KEY, () => service.remove(id)),
};
const savedMessage = 'Бронювання додано.';

const form = document.querySelector('#booking-form');
const list = document.querySelector('#bookings');
const empty = document.querySelector('#empty');
const search = document.querySelector('#search');
const clear = document.querySelector('#clear');
const status = document.querySelector('#status');
const removalStatus = document.querySelector('#removal-status');
const confirmation = document.querySelector('#confirmation');
let listVersion = 0;
let selectedBooking;

function announce(target, message, error = false) {
  target.textContent = message;
  target.dataset.error = String(error);
}

function showConfirmation(booking) {
  selectedBooking = booking.id;
  confirmation.querySelector('p').textContent = `Видалити бронювання гравця "${booking.player}"?`;
  confirmation.showModal();
}

async function refresh() {
  const version = ++listVersion;
  const query = search.value;
  try {
    const { bookings, zones } = await client.list(query);
    if (version !== listVersion) return;
    renderBookingList(list, empty, bookings, query, showConfirmation);
    return zones;
  } catch {
    if (version === listVersion) {
      empty.hidden = false;
      empty.textContent = 'Не вдалося прочитати бронювання.';
    }
  }
}

const setZones = mountBookingForm(form, async (input) => {
  try {
    const result = await client.add(input);
    announce(status, result.ok ? savedMessage : result.error, !result.ok);
    if (result.ok) await refresh();
    return result.ok;
  } catch {
    announce(status, 'Не вдалося зберегти бронювання.', true);
    return false;
  }
});

confirmation.addEventListener('close', async () => {
  if (confirmation.returnValue !== 'delete') return;
  try {
    const result = await client.remove(selectedBooking);
    announce(removalStatus, result.ok ? 'Бронювання видалено.' : result.error, !result.ok);
    if (result.ok) {
      await refresh();
      search.focus();
    }
  } catch {
    announce(removalStatus, 'Не вдалося видалити бронювання.', true);
  }
});

confirmation.addEventListener('cancel', () => {
  confirmation.returnValue = 'cancel';
});
search.addEventListener('input', (event) => {
  clear.hidden = clear.disabled = !search.value;
  if (!event.isComposing) void refresh();
});
search.addEventListener('compositionend', () => void refresh());
clear.addEventListener('click', () => {
  search.value = '';
  clear.hidden = clear.disabled = true;
  search.focus();
  void refresh();
});

window.addEventListener('storage', (event) => {
  if (event.key === STORAGE_KEY || event.key === null) void refresh();
});

const zones = await refresh();
if (zones) {
  setZones(zones);
  search.disabled = false;
}
