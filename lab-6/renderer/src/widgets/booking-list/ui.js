import { createBookingItemElement } from '../../entities/booking/ui.js';
import { filterBookings } from '../../features/filter-bookings/model.js';

/**
 * FSD Widget UI: Віджет списку бронювань із підтримкою фільтрації та пустого стану.
 */
export function initBookingListWidget({ onToggle, onDelete }) {
  const bookingsList = document.getElementById('bookingsList');
  const searchInput = document.getElementById('searchInput');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const emptyStateEl = document.getElementById('emptyStateMessage');

  let currentQuery = '';
  let currentStatus = 'all';

  function render(bookings = []) {
    if (!bookingsList) return;

    const filtered = filterBookings(bookings, currentQuery, currentStatus);
    bookingsList.innerHTML = '';

    if (filtered.length === 0) {
      if (emptyStateEl) {
        emptyStateEl.style.display = 'block';
        if (bookings.length === 0) {
          emptyStateEl.textContent = 'Бронювань поки немає. Додайте перше!';
        } else {
          emptyStateEl.textContent = 'За вашим пошуковим запитом нічого не знайдено.';
        }
      }
      return;
    }

    if (emptyStateEl) {
      emptyStateEl.style.display = 'none';
    }

    filtered.forEach((booking) => {
      const itemEl = createBookingItemElement(booking, {
        onToggle,
        onDelete,
      });
      bookingsList.appendChild(itemEl);
    });
  }

  function bindEvents(onFilterChange) {
    searchInput?.addEventListener('input', (e) => {
      currentQuery = e.target.value;
      if (onFilterChange) onFilterChange();
    });

    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        filterTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        currentStatus = tab.dataset.status || 'all';
        if (onFilterChange) onFilterChange();
      });
    });
  }

  return {
    render,
    bindEvents,
    getQuery: () => currentQuery,
    getStatus: () => currentStatus,
  };
}
