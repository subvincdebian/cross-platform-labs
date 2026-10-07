import React, { useState } from 'react';
import { PlusCircle, Calculator, Info } from 'lucide-react';
import { Button, Input, Select, Card, AlertMessage } from '@/shared/ui';
import { GAMING_ZONES, GamingZone } from '@/shared/config/zones';
import { Booking } from '@/entities/booking';

export interface BookingFormProps {
  onAddBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onAddBooking }) => {
  // Поточна дата у форматі YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  const [playerName, setPlayerName] = useState('');
  const [zoneId, setZoneId] = useState(GAMING_ZONES[0].id);
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState('14:00');
  const [durationHours, setDurationHours] = useState<number>(2);
  const [pcNumber, setPcNumber] = useState<number>(1);
  const [notes, setNotes] = useState('');

  // Стан сповіщення (успіх або помилка валідації)
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const currentZone = GAMING_ZONES.find((z) => z.id === zoneId) as GamingZone;
  const estimatedPrice = durationHours * (currentZone?.ratePerHour || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Перевірка обов'язкового поля відповідно до Завдання 12 методички
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
        message: 'Тривалість сесії повинна бути не менше 1 години!',
      });
      return;
    }

    if (pcNumber <= 0 || pcNumber > currentZone.totalPcs) {
      setAlert({
        type: 'error',
        message: `Номер ПК для обраної зони повинен бути від 1 до ${currentZone.totalPcs}!`,
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

    // Очищення форми
    setPlayerName('');
    setNotes('');
    setAlert({
      type: 'success',
      message: 'Бронювання успішно додано!',
    });
  };

  const zoneOptions = GAMING_ZONES.map((z) => ({
    value: z.id,
    label: `${z.name} — ${z.ratePerHour} грн/год`,
  }));

  return (
    <Card glow="emerald" className="w-full">
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-400" />
            Нове бронювання
          </h2>
          <p className="text-xs text-slate-400">
            Заповніть форму для закріплення ігрового місця
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-mono font-medium">
          <Calculator className="w-3.5 h-3.5" />
          {estimatedPrice} грн
        </div>
      </div>

      {alert && (
        <div className="mb-4">
          <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Нікнейм гравця */}
        <Input
          label="Нікнейм гравця *"
          value={playerName}
          onChange={(e) => {
            setPlayerName(e.target.value);
            if (alert?.type === 'error') setAlert(null);
          }}
          placeholder="Наприклад: s1mple, CyberShadow, ShadowFiend..."
          autoFocus
        />

        {/* Ігрова зона клубу */}
        <Select
          label="Ігрова зона клубу"
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

        {/* Опис вибраної зони */}
        <div className="text-xs text-slate-400 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80 flex items-start gap-2">
          <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-300">{currentZone.name}: </span>
            {currentZone.description}
          </div>
        </div>

        {/* Дата та Час */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Дата бронювання"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Input
            label="Час початку"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        {/* Номер ПК та Тривалість */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label={`Номер місця / ПК (1 - ${currentZone.totalPcs})`}
            type="number"
            min={1}
            max={currentZone.totalPcs}
            value={pcNumber}
            onChange={(e) => setPcNumber(Number(e.target.value))}
          />
          <Input
            label="Тривалість (години)"
            type="number"
            min={1}
            max={24}
            value={durationHours}
            onChange={(e) => setDurationHours(Math.max(1, Number(e.target.value)))}
          />
        </div>

        {/* Коментар / Побажання */}
        <Input
          label="Коментар / Побажання (опціонально)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Наприклад: Встановити оновлення CS2 / без газованої води"
        />

        {/* Інформація про підсумкову вартість */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-xs text-slate-400">
            Розрахунок: <span className="text-slate-200">{durationHours} год × {currentZone.ratePerHour} грн/год</span>
          </div>
          <div className="text-base font-bold text-emerald-400 font-mono">
            Разом: {estimatedPrice} грн
          </div>
        </div>

        <Button type="submit" variant="primary" size="md" className="w-full mt-1">
          Додати бронювання
        </Button>
      </form>
    </Card>
  );
};
