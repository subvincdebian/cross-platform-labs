import { GAMING_ZONES, getZoneById } from '../../shared/config/zones.js';

/**
 * FSD Widget UI: Форма додавання бронювання клубу CyberClub.
 */
export function initBookingFormWidget({ onAdd }) {
  const playerInput = document.getElementById('playerNameInput');
  const zoneSelect = document.getElementById('zoneSelect');
  const pcNumberInput = document.getElementById('pcNumberInput');
  const durationInput = document.getElementById('durationInput');
  const notesInput = document.getElementById('bookingNotesInput');
  const bookButton = document.getElementById('bookButton');
  const tariffPill = document.getElementById('tariffPill');

  // Ініціалізація списку зон у select
  if (zoneSelect) {
    zoneSelect.innerHTML = '';
    GAMING_ZONES.forEach((zone) => {
      const opt = document.createElement('option');
      opt.value = zone.id;
      opt.textContent = `${zone.name} (${zone.ratePerHour} ₴/год)`;
      zoneSelect.appendChild(opt);
    });
  }

  function updateTariffPreview() {
    if (!zoneSelect || !tariffPill) return;
    const zoneId = zoneSelect.value;
    const zone = getZoneById(zoneId);
    const duration = Math.max(1, parseInt(durationInput?.value, 10) || 1);
    const total = duration * zone.ratePerHour;

    tariffPill.textContent = `Тариф: ${zone.ratePerHour} ₴/год · Тривалість: ${duration} год · До сплати: ${total} ₴`;

    if (pcNumberInput) {
      pcNumberInput.placeholder = `ПК (${zone.pcRange})`;
      pcNumberInput.max = zone.totalPcs;
    }
  }

  zoneSelect?.addEventListener('change', updateTariffPreview);
  durationInput?.addEventListener('input', updateTariffPreview);
  updateTariffPreview();

  const handleFormSubmit = async () => {
    const player = playerInput?.value || '';
    const zoneId = zoneSelect?.value || 'standard';
    const pcNumber = pcNumberInput?.value || '1';
    const durationHours = durationInput?.value || '2';
    const notes = notesInput?.value || '';

    const result = await onAdd({
      player,
      zoneId,
      pcNumber,
      durationHours,
      notes,
    });

    if (result && result.success) {
      if (playerInput) {
        playerInput.value = '';
        playerInput.focus();
      }
      if (notesInput) {
        notesInput.value = '';
      }
    }
  };

  bookButton?.addEventListener('click', handleFormSubmit);

  playerInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleFormSubmit();
    }
  });

  return {
    updateTariffPreview,
    clearInputs: () => {
      if (playerInput) playerInput.value = '';
      if (notesInput) notesInput.value = '';
    },
  };
}
