const zoneSelect = document.getElementById("zoneSelect");
const bookButton = document.getElementById("bookButton");
const bookingsList = document.getElementById("bookingsList");
const statusMessage = document.getElementById("statusMessage");

const STORAGE_KEY = "cyberclub_bookings";

function showStatus(text, color) {
  statusMessage.textContent = text;
  statusMessage.style.color = color;
  clearTimeout(statusMessage.timer);
  statusMessage.timer = setTimeout(() => {
    statusMessage.textContent = "";
  }, 3000);
}

function getSavedBookings() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [
      { player: "s1mple_pro", zone: "Boot Camp 5x5 (Team Room)" },
      { player: "CyberGhost", zone: "VIP Lounge (ПК #21-30)" },
    ];
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveBookings(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

function createBookingElement(booking, index) {
  const li = document.createElement("li");
  li.className = "booking-item";

  const infoDiv = document.createElement("div");
  infoDiv.className = "booking-info";

  const nickSpan = document.createElement("span");
  nickSpan.className = "player-nick";
  nickSpan.textContent = booking.player;

  const zoneSpan = document.createElement("span");
  zoneSpan.className = "zone-badge";
  zoneSpan.textContent = booking.zone;

  infoDiv.appendChild(nickSpan);
  infoDiv.appendChild(zoneSpan);

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "cancel-btn";
  cancelBtn.textContent = "Скасувати";

  cancelBtn.addEventListener("click", () => {
    cancelBooking(index);
  });

  li.appendChild(infoDiv);
  li.appendChild(cancelBtn);
  return li;
}

function renderBookings() {
  const bookings = getSavedBookings();
  bookingsList.innerHTML = "";

  if (bookings.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent =
      "Наразі немає активних бронювань. Оберіть зону та зареєструйте місце.";
    bookingsList.appendChild(empty);
    return;
  }

  bookings.forEach((booking, index) => {
    bookingsList.appendChild(createBookingElement(booking, index));
  });
}

function addBooking() {
  const player = playerNameInput.value.trim();
  const zone = zoneSelect.value;

  if (player === "") {
    showStatus("Будь ласка, введіть нікнейм гравця.", "#ef4444");
    playerNameInput.focus();
    return;
  }

  const bookings = getSavedBookings();
  bookings.push({ player, zone });
  saveBookings(bookings);

  renderBookings();
  playerNameInput.value = "";
  playerNameInput.focus();
  showStatus("Місце успішно заброньовано!", "#10b981");
}

function cancelBooking(index) {
  const bookings = getSavedBookings();
  bookings.splice(index, 1);
  saveBookings(bookings);

  renderBookings();
  showStatus("Бронювання скасовано.", "#f59e0b");
}

bookButton.addEventListener("click", addBooking);

playerNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addBooking();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderBookings();
});
