import React from 'react';
import { Trash2, Check, RotateCcw } from 'lucide-react';
import { Booking } from '../model/types';
import { Button } from '@/shared/ui';

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
  return (
    <div
      className={`rounded-xl border transition-colors p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        booking.done
          ? 'bg-slate-900/20 border-slate-800/60 text-slate-400'
          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700/80 text-slate-100'
      }`}
    >
      {/* Інформація про бронювання */}
      <div className="flex items-start sm:items-center gap-3">
        {/* Кнопка швидкого перемикання статусу */}
        <button
          type="button"
          onClick={() => onToggleStatus(booking.id)}
          title={booking.done ? 'Позначити як активне' : 'Позначити як виконано'}
          className={`mt-0.5 sm:mt-0 w-5 h-5 rounded border flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
            booking.done
              ? 'bg-slate-800 border-slate-700 text-slate-400'
              : 'border-slate-700 hover:border-slate-500 text-transparent hover:text-slate-500'
          }`}
        >
          <Check className="w-3.5 h-3.5" />
        </button>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-medium ${
                booking.done ? 'line-through text-slate-500' : 'text-slate-100'
              }`}
            >
              {booking.playerName}
            </span>
            <span className="text-slate-600 text-xs">&middot;</span>
            <span className="text-xs text-slate-400">
              {booking.zoneName}
            </span>
            <span className="text-slate-600 text-xs">&middot;</span>
            <span className="text-xs text-slate-400">
              ПК #{booking.pcNumber}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
            <span>{booking.date}</span>
            <span>{booking.startTime} ({booking.durationHours} год)</span>
            {booking.notes && (
              <>
                <span>&middot;</span>
                <span className="text-slate-400 truncate max-w-xs">{booking.notes}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Права частина: ціна та дії */}
      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
        <span className={`text-sm font-medium font-mono ${booking.done ? 'text-slate-500' : 'text-slate-200'}`}>
          {booking.price} ₴
        </span>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleStatus(booking.id)}
            title={booking.done ? 'Відновити' : 'Виконано'}
          >
            {booking.done ? (
              <RotateCcw className="w-3.5 h-3.5" />
            ) : (
              <span className="text-xs">Виконано</span>
            )}
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(booking.id)}
            title="Видалити"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
