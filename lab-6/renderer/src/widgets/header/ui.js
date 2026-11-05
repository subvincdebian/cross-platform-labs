export function updateHeaderWidget(bookings = []) {
  const totalCountEl = document.getElementById('statTotalCount');
  const activeCountEl = document.getElementById('statActiveCount');
  const doneCountEl = document.getElementById('statDoneCount');
  const totalRevenueEl = document.getElementById('statTotalRevenue');

  const total = bookings.length;
  const active = bookings.filter((b) => !b.done).length;
  const done = bookings.filter((b) => b.done).length;
  const revenue = bookings.reduce((sum, b) => sum + (Number(b.price) || 0), 0);

  if (totalCountEl) totalCountEl.textContent = total;
  if (activeCountEl) activeCountEl.textContent = active;
  if (doneCountEl) doneCountEl.textContent = done;
  if (totalRevenueEl) totalRevenueEl.textContent = `${revenue} ₴`;
}
