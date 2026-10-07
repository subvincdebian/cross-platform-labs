import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '@/widgets/header';
import { BookingForm } from '@/widgets/booking-form';
import { BookingList } from '@/widgets/booking-list';
import { BookingFilters } from '@/features/filter-bookings';
import { Booking, BookingFiltersState } from '@/entities/booking';
import { loadFromStorage, saveToStorage } from '@/shared/lib/storage';
import { STORAGE_KEY } from '@/shared/config/zones';

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'demo-1',
    playerName: 's1mple',
    zoneId: 'vip',
    zoneName: 'VIP Lounge',
    date: new Date().toISOString().split('T')[0],
    startTime: '16:00',
    pcNumber: 23,
    durationHours: 3,
    price: 270,
    notes: 'Турнірна розминка',
    done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    playerName: 'b1t_headshot',
    zoneId: 'bootcamp',
    zoneName: 'Boot Camp',
    date: new Date().toISOString().split('T')[0],
    startTime: '18:00',
    pcNumber: 2,
    durationHours: 4,
    price: 480,
    notes: 'Праки з командою',
    done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    playerName: 'CyberGamer_UA',
    zoneId: 'standard',
    zoneName: 'Standard',
    date: new Date().toISOString().split('T')[0],
    startTime: '11:00',
    pcNumber: 7,
    durationHours: 2,
    price: 120,
    done: true,
    createdAt: new Date().toISOString(),
  },
];

export const CyberClubPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    return loadFromStorage<Booking[]>(STORAGE_KEY, INITIAL_BOOKINGS);
  });

  const [filters, setFilters] = useState<BookingFiltersState>({
    search: '',
    status: 'all',
    zoneId: 'all',
  });

  useEffect(() => {
    saveToStorage(STORAGE_KEY, bookings);
  }, [bookings]);

  const handleAddBooking = (data: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...data,
      id: `b-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleToggleStatus = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, done: !b.done } : b))
    );
  };

  const handleDeleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const totalCount = bookings.length;
  const activeCount = useMemo(() => bookings.filter((b) => !b.done).length, [bookings]);
  const completedCount = useMemo(() => bookings.filter((b) => b.done).length, [bookings]);
  const totalRevenue = useMemo(
    () => bookings.reduce((sum, b) => sum + b.price, 0),
    [bookings]
  );

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const query = filters.search.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        b.playerName.toLowerCase().includes(query) ||
        b.zoneName.toLowerCase().includes(query) ||
        (b.notes && b.notes.toLowerCase().includes(query)) ||
        b.pcNumber.toString().includes(query);

      let matchesStatus = true;
      if (filters.status === 'active') matchesStatus = !b.done;
      if (filters.status === 'completed') matchesStatus = b.done;

      const matchesZone =
        filters.zoneId === 'all' || b.zoneId === filters.zoneId;

      return matchesSearch && matchesStatus && matchesZone;
    });
  }, [bookings, filters]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-slate-800 selection:text-white">
      <Header
        totalCount={totalCount}
        activeCount={activeCount}
        completedCount={completedCount}
        totalRevenue={totalRevenue}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Форма */}
          <div className="md:col-span-5 w-full">
            <BookingForm onAddBooking={handleAddBooking} />
          </div>

          {/* Список */}
          <div className="md:col-span-7 flex flex-col gap-3.5 w-full">
            <BookingFilters
              filters={filters}
              onFilterChange={setFilters}
              totalCount={totalCount}
              activeCount={activeCount}
              completedCount={completedCount}
            />

            <BookingList
              bookings={filteredBookings}
              totalCount={totalCount}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteBooking}
              onResetFilters={() =>
                setFilters({ search: '', status: 'all', zoneId: 'all' })
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
};
