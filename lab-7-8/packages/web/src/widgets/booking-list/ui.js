export function renderBookingList(list, empty, bookings, query, requestRemoval) {
  empty.hidden = bookings.length > 0;
  empty.textContent = query.trim()
    ? 'За цим запитом бронювань немає.'
    : 'Бронювань поки немає. Додайте перше.';
  list.replaceChildren(...bookings.map((booking) => {
    const row = document.createElement('li');
    const details = document.createElement('div');
    const name = document.createElement('strong');
    const description = document.createElement('p');
    const date = document.createElement('time');
    const remove = document.createElement('button');

    name.textContent = booking.player;
    description.textContent = `${booking.zoneName} · місце ${booking.pcNumber} · ${booking.durationHours} год · ${booking.price} грн`;
    date.dateTime = booking.createdAt;
    date.textContent = booking.dateLabel;
    remove.type = 'button';
    remove.className = 'secondary';
    remove.textContent = 'Видалити';
    remove.setAttribute('aria-label', `Видалити бронювання ${booking.player}`);
    remove.addEventListener('click', () => requestRemoval(booking));

    details.append(name, description, date);
    row.append(details, remove);
    return row;
  }));
}
