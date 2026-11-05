export function filterBookings(bookings, query = '', statusFilter = 'all') {
  const normalizedQuery = (query || '').trim().toLowerCase();

  return bookings.filter((b) => {
    const matchesSearch =
      !normalizedQuery ||
      (b.player && b.player.toLowerCase().includes(normalizedQuery)) ||
      (b.zoneName && b.zoneName.toLowerCase().includes(normalizedQuery)) ||
      (b.notes && b.notes.toLowerCase().includes(normalizedQuery)) ||
      (b.pcNumber && b.pcNumber.toString().includes(normalizedQuery)) ||
      (b.text && b.text.toLowerCase().includes(normalizedQuery));

    let matchesStatus = true;
    if (statusFilter === 'active') matchesStatus = !b.done;
    if (statusFilter === 'completed') matchesStatus = Boolean(b.done);

    return matchesSearch && matchesStatus;
  });
}
