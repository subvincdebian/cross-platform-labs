import React from 'react';
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
      <div className="border border-slate-800 rounded-xl p-8 text-center text-xs text-slate-500">
        Немає збережених бронювань. Додайте нове через форму.
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="border border-slate-800 rounded-xl p-8 text-center text-xs text-slate-500 flex flex-col items-center gap-2">
        <span>За заданими фільтрами нічого не знайдено.</span>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-slate-400 hover:text-slate-200 underline cursor-pointer"
          >
            Скинути фільтри
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
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
