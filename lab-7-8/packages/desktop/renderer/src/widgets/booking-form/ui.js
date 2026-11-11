export function mountBookingForm(form, add) {
  const zoneSelect = form.elements.zoneId;
  const station = form.elements.pcNumber;
  const submit = form.querySelector('button');
  let zones = [];

  function selectZone() {
    const zone = zones.find(({ id }) => id === zoneSelect.value);
    station.value = zone.first;
    station.min = zone.first;
    station.max = zone.last;
    form.querySelector('#zone-range').textContent = `Місця ${zone.first}-${zone.last} · ${zone.rate} грн/год`;
  }

  zoneSelect.addEventListener('change', selectZone);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submit.disabled) return;

    submit.disabled = true;
    try {
      const saved = await add({
        player: form.elements.player.value,
        zoneId: zoneSelect.value,
        pcNumber: station.valueAsNumber,
        durationHours: form.elements.durationHours.valueAsNumber,
      });
      if (saved) {
        form.elements.player.value = '';
        form.elements.player.focus();
      }
    } finally {
      submit.disabled = false;
    }
  });

  return (availableZones) => {
    zones = availableZones;
    zoneSelect.replaceChildren(...zones.map(({ name, id }) => new Option(name, id)));
    selectZone();
    form.elements.bookingFields.disabled = false;
  };
}
