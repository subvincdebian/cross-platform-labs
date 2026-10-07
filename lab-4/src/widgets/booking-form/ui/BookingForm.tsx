import React, { useState } from 'react';
import { Button, Input, Select, Card, AlertMessage } from '@/shared/ui';
import { GAMING_ZONES, GamingZone } from '@/shared/config/zones';
import { Booking } from '@/entities/booking';

export interface BookingFormProps {
  onAddBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onAddBooking }) => {
  // Дати для швидкого вибору
  const formatDate = (d: Date) => d.toISOString().split('T')[0];
  const today = formatDate(new Date());
  const tomorrow = formatDate(new Date(Date.now() + 86400000));
  const dayAfter = formatDate(new Date(Date.now() + 86400000 * 2));

  const [playerName, setPlayerName] = useState('');
  const [zoneId, setZoneId] = useState(GAMING_ZONES[0].id);
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState('15:00');
  const [durationHours, setDurationHours] = useState<number>(2);
  const [pcNumber, setPcNumber] = useState<number>(1);
  const [notes, setNotes] = useState('');

  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const currentZone = GAMING_ZONES.find((z) => z.id === zoneId) as GamingZone;
  const estimatedPrice = durationHours * (currentZone?.ratePerHour || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!playerName.trim()) {
      setAlert({
        type: 'error',
        message: 'Введіть нікнейм гравця!',
      });
      return;
    }

    if (durationHours <= 0) {
      setAlert({
        type: 'error',
        message: 'Тривалість сесії має бути від 1 години!',
      });
      return;
    }

    if (pcNumber <= 0 || pcNumber > currentZone.totalPcs) {
      setAlert({
        type: 'error',
        message: `Номер ПК для обраної зони має бути від 1 до ${currentZone.totalPcs}!`,
      });
      return;
    }

    onAddBooking({
      playerName: playerName.trim(),
      zoneId: currentZone.id,
      zoneName: currentZone.name,
      date,
      startTime,
      durationHours: Number(durationHours),
      pcNumber: Number(pcNumber),
      price: estimatedPrice,
      notes: notes.trim() || undefined,
      done: false,
    });

    setPlayerName('');
    setNotes('');
    setAlert({
      type: 'success',
      message: 'Бронювання успішно додано!',
    });
  };

  const zoneOptions = GAMING_ZONES.map((z) => ({
    value: z.id,
    label: `${z.name} — ${z.ratePerHour} ₴/год`,
  }));

  const quickDates = [
    { label: 'Сьогодні', value: today },
    { label: 'Завтра', value: tomorrow },
    { label: 'Післязавтра', value: dayAfter },
  ];

  const quickTimes = ['12:00', '15:00', '18:00', '21:00', '23:00'];
  const quickDurations = [1, 2, 3, 5];

  return (
    <Card className="flex flex-col gap-4">
      {/* Заголовок форми: без іконки та без плашки тарифу */}
      <div className="pb-3 border-b border-slate-800/80">
        <h2 className="text-base font-bold text-slate-100 tracking-tight">
          Нове бронювання
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Оформлення ігрового місця
        </p>
      </div>

      {alert && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Гравець */}
        <Input
          label="Гравець"
          badge="Нікнейм"
          value={playerName}
          onChange={(e) => {
            setPlayerName(e.target.value);
            if (alert?.type === 'error') setAlert(null);
          }}
          placeholder="Наприклад: s1mple"
        />

        {/* Ігрова зона */}
        <Select
          label="Ігрова зона"
          value={zoneId}
          onChange={(e) => {
            const newZoneId = e.target.value;
            setZoneId(newZoneId);
            const selected = GAMING_ZONES.find((z) => z.id === newZoneId);
            if (selected && pcNumber > selected.totalPcs) {
              setPcNumber(1);
            }
          }}
          options={zoneOptions}
        />

        {/* Зручний вибір дати */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-300">Дата</span>
            <div className="flex items-center gap-1">
              {quickDates.map((qd) => (
                <button
                  key={qd.value}
                  type="button"
                  onClick={() => setDate(qd.value)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                    date === qd.value
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {qd.label}
                </button>
              ))}
            </div>
          </div>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Зручний вибір часу початку */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-300">Час початку</span>
            <div className="flex items-center gap-1">
              {quickTimes.map((qt) => (
                <button
                  key={qt}
                  type="button"
                  onClick={() => setStartTime(qt)}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                    startTime === qt
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {qt}
                </button>
              ))}
            </div>
          </div>
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        {/* ПК та Тривалість */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label={`ПК # (1 - ${currentZone.totalPcs})`}
            type="number"
            min={1}
            max={currentZone.totalPcs}
            value={pcNumber}
            onChange={(e) => setPcNumber(Number(e.target.value))}
          />

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-300">Тривалість</span>
              <div className="flex items-center gap-1">
                {quickDurations.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setDurationHours(h)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                      durationHours === h
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                        : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {h}г
                  </button>
                ))}
              </div>
            </div>
            <Input
              type="number"
              min={1}
              max={24}
              value={durationHours}
              onChange={(e) => setDurationHours(Math.max(1, Number(e.target.value)))}
            />
          </div>
        </div>

        {/* Коментар */}
        <Input
          label="Коментар"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Побажання щодо девайсів чи ігор"
        />

        {/* Чіткий блок розрахунку вартості: текст добре видно */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-700/80 shadow-inner">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-medium">
              Тарифікація
            </span>
            <span className="text-sm font-semibold text-slate-100 font-mono tracking-tight">
              {durationHours} год &times; {currentZone.ratePerHour} ₴/год
            </span>
          </div>

          <div className="text-right flex flex-col gap-0.5">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-medium">
              До сплати
            </span>
            <span className="text-lg font-bold text-emerald-400 font-mono">
              {estimatedPrice} ₴
            </span>
          </div>
        </div>

        <Button type="submit" variant="primary" size="md" className="w-full">
          Додати бронювання
        </Button>
      </form>
    </Card>
  );
};
