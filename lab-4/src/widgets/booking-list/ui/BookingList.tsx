import React from 'react';
import { CalendarX, SearchX } from 'lucide-react';
import { Booking, BookingCard } from '@/entities/booking';

export interface BookingListProps {
  bookings: Booking[];
  totalCount: number;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onResetFilters?: () => void;
}

export const BookingList: React.FC<BookingListProps> = ({
  bookings,
  totalCount,
  onToggleStatus,
  onDelete,
  onResetFilters,
}) => {
  if (totalCount === 0) {
    return (
      <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mb-3">
          <CalendarX className="w-7 h-7" />
        </div>
        <h3 className="text-base font-semibold text-slate-200">
          Бронювань поки немає
        </h3>
        <p className="text-sm text-slate-400 max-w-sm mt-1">
          Додайте перше бронювання у формі ліворуч, щоб розпочати облік сесій клубу.
        </p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mb-3">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-base font-semibold text-slate-200">
          Нічого не знайдено
        </h3>
        <p className="text-sm text-slate-400 max-w-sm mt-1">
          За вашим запитом не знайдено жодного бронювання. Спробуйте змінити фільтри.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="mt-4 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
          >
            Скинути пошукові параметри
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
