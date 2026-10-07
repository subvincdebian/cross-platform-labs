import React, { useState } from 'react';
import { Button, Input, Select, Card, AlertMessage } from '@/shared/ui';
import { GAMING_ZONES, GamingZone } from '@/shared/config/zones';
import { Booking } from '@/entities/booking';

export interface BookingFormProps {
  onAddBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onAddBooking }) => {
  const today = new Date().toISOString().split('T')[0];

  const [playerName, setPlayerName] = useState('');
  const [zoneId, setZoneId] = useState(GAMING_ZONES[0].id);
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState('14:00');
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
        message: `Номер ПК має бути від 1 до ${currentZone.totalPcs}!`,
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
    label: `${z.name} (${z.ratePerHour} ₴/год)`,
  }));

  return (
    <Card className="flex flex-col gap-3.5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-100">
          Нове бронювання
        </h2>
        <span className="text-xs text-slate-400 font-mono">
          {estimatedPrice} ₴
        </span>
      </div>

      {alert && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          label="Нікнейм гравця"
          value={playerName}
          onChange={(e) => {
            setPlayerName(e.target.value);
            if (alert?.type === 'error') setAlert(null);
          }}
          placeholder="s1mple"
        />

        <Select
          label="Зона"
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

        <div className="grid grid-cols-2 gap-2.5">
          <Input
            label="Дата"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Input
            label="Час"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <Input
            label={`Місце (1-${currentZone.totalPcs})`}
            type="number"
            min={1}
            max={currentZone.totalPcs}
            value={pcNumber}
            onChange={(e) => setPcNumber(Number(e.target.value))}
          />
          <Input
            label="Тривалість (год)"
            type="number"
            min={1}
            max={24}
            value={durationHours}
            onChange={(e) => setDurationHours(Math.max(1, Number(e.target.value)))}
          />
        </div>

        <Input
          label="Коментар"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Опціонально"
        />

        <Button type="submit" variant="primary" size="md" className="w-full mt-1">
          Додати бронювання
        </Button>
      </form>
    </Card>
  );
};
