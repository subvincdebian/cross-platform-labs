import React from 'react';
import { Trash2, Check, RotateCcw, Calendar, Clock, Monitor } from 'lucide-react';
import { Booking } from '../model/types';
import { Button } from '@/shared/ui';
import { GAMING_ZONES } from '@/shared/config/zones';

export interface BookingCardProps {
  booking: Booking;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onToggleStatus,
  onDelete,
}) => {
  const zone = GAMING_ZONES.find((z) => z.id === booking.zoneId);
  const accent = zone?.accent || {
    text: 'text-slate-300',
    bg: 'bg-slate-800',
    border: 'border-slate-700',
    dot: 'bg-slate-400',
  };

  return (
    <div
      className={`group rounded-2xl border transition-all duration-200 p-4 ${
        booking.done
          ? 'bg-slate-900/30 border-slate-800/50 opacity-70'
          : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        {/* Лівий блок */}
        <div className="flex items-start sm:items-center gap-3">
          {/* Чекбокс / Статус */}
          <button
            type="button"
            onClick={() => onToggleStatus(booking.id)}
            title={booking.done ? 'Позначити як активне' : 'Позначити як виконано'}
            className={`mt-0.5 sm:mt-0 w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 cursor-pointer transition-all ${
              booking.done
                ? 'bg-slate-800 border-slate-700 text-slate-400'
                : 'border-slate-700 bg-slate-900/60 hover:border-emerald-500/80 text-transparent hover:text-emerald-400'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
          </button>

          {/* Інформація */}
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-sm font-semibold tracking-tight ${
                  booking.done ? 'line-through text-slate-500' : 'text-slate-100'
                }`}
              >
                {booking.playerName}
              </span>

              {/* Зона з колірним акцентом */}
              <span
                className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded border ${accent.border} ${accent.bg} ${accent.text}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
                {booking.zoneName}
              </span>

              {/* Статус сесії */}
              <span className="inline-flex items-center gap-1 text-[11px] font-mono">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    booking.done ? 'bg-slate-500' : 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
                  }`}
                />
                <span className={booking.done ? 'text-slate-500' : 'text-emerald-400 font-medium'}>
                  {booking.done ? 'Виконано' : 'Активне'}
                </span>
              </span>
            </div>

            {/* Параметри сесії */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Monitor className="w-3.5 h-3.5 text-slate-500" />
                ПК #{booking.pcNumber}
              </span>
              <span className="text-slate-700">&middot;</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {booking.startTime} ({booking.durationHours} год)
              </span>
              <span className="text-slate-700">&middot;</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                {booking.date}
              </span>
            </div>

            {booking.notes && (
              <p className="text-xs text-slate-400 italic mt-0.5">
                &ldquo;{booking.notes}&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* Правий блок: вартість та кнопки дій */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
          <div className="text-left sm:text-right">
            <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-500">
              Вартість
            </span>
            <span
              className={`text-base font-bold font-mono ${
                booking.done ? 'text-slate-500' : 'text-emerald-400'
              }`}
            >
              {booking.price} ₴
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant={booking.done ? 'ghost' : 'secondary'}
              size="sm"
              onClick={() => onToggleStatus(booking.id)}
              title={booking.done ? 'Відновити' : 'Позначити як виконано'}
            >
              {booking.done ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="text-xs">Відновити</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="text-xs">Виконано</span>
                </>
              )}
            </Button>

            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(booking.id)}
              title="Видалити бронювання"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
