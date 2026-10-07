import React from 'react';
import { Calendar, Clock, Monitor, Trash2, CheckCircle2, RotateCcw, MessageSquare } from 'lucide-react';
import { Booking } from '../model/types';
import { Badge, Button } from '@/shared/ui';
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

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 p-5 ${
        booking.done
          ? 'bg-slate-900/40 border-slate-800/80 opacity-75'
          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-lg'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Ліва частина: Інформація про гравця та сесію */}
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3
              className={`text-lg font-bold tracking-tight ${
                booking.done ? 'line-through text-slate-500' : 'text-slate-100'
              }`}
            >
              {booking.playerName}
            </h3>

            <Badge variant="custom" customClass={zone?.badgeColor || 'border-slate-700 bg-slate-800 text-slate-300'}>
              {booking.zoneName}
            </Badge>

            {booking.done ? (
              <Badge variant="success">Виконано</Badge>
            ) : (
              <Badge variant="info">Активне</Badge>
            )}
          </div>

          {/* Деталі: дата, час, ПК, тривалість */}
          <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {booking.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {booking.startTime || '12:00'} ({booking.durationHours} год)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-slate-500" />
              Місце #{booking.pcNumber}
            </span>
          </div>

          {/* Примітки/коментар якщо є */}
          {booking.notes && (
            <p className="text-xs text-slate-400 italic flex items-center gap-1.5 mt-0.5">
              <MessageSquare className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{booking.notes}</span>
            </p>
          )}
        </div>

        {/* Права частина: Ціна та кнопки дій */}
        <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800/80">
          <div className="text-left md:text-right">
            <span className="block text-xs uppercase tracking-wider text-slate-400 font-medium">Вартість</span>
            <span className="text-lg font-bold text-emerald-400 font-mono">
              {booking.price} грн
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={booking.done ? 'outline' : 'success'}
              size="sm"
              onClick={() => onToggleStatus(booking.id)}
              title={booking.done ? 'Позначити як активне' : 'Позначити як виконано'}
            >
              {booking.done ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Відновити</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Виконано</span>
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
              <span className="hidden sm:inline">Видалити</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
