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
    zoneName: 'VIP Lounge (ПК #21-30)',
    date: new Date().toISOString().split('T')[0],
    startTime: '16:00',
    pcNumber: 23,
    durationHours: 3,
    price: 270,
    notes: 'Турнірна розминка перед Faceit Major',
    done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    playerName: 'b1t_headshot',
    zoneId: 'bootcamp',
    zoneName: 'Boot Camp 5x5 (Team Room)',
    date: new Date().toISOString().split('T')[0],
    startTime: '18:00',
    pcNumber: 2,
    durationHours: 4,
    price: 480,
    notes: 'Праки з NaVi',
    done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    playerName: 'CyberGamer_UA',
    zoneId: 'standard',
    zoneName: 'Standard Zone (ПК #1-20)',
    date: new Date().toISOString().split('T')[0],
    startTime: '11:00',
    pcNumber: 7,
    durationHours: 2,
    price: 120,
    done: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-4',
    playerName: 'DualSense_Pro',
    zoneId: 'ps5',
    zoneName: 'PlayStation 5 Arena (#1-4)',
    date: new Date().toISOString().split('T')[0],
    startTime: '20:00',
    pcNumber: 1,
    durationHours: 2,
    price: 160,
    notes: 'FC 25 турнір 2v2',
    done: false,
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
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Делікатні фонові світлові плями (ambient mesh) */}
      <div className="pointer-events-none fixed -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.06] blur-[140px]" />
      <div className="pointer-events-none fixed top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-violet-500/[0.06] blur-[140px]" />
      <div className="pointer-events-none fixed -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-sky-500/[0.04] blur-[140px]" />

      <Header
        totalCount={totalCount}
        activeCount={activeCount}
        completedCount={completedCount}
        totalRevenue={totalRevenue}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Ліва частина: Форма */}
          <div className="lg:col-span-5 w-full lg:sticky lg:top-24">
            <BookingForm onAddBooking={handleAddBooking} />
          </div>

          {/* Права частина: Фільтрація та список */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 w-full">
            <BookingFilters
              filters={filters}
              onFilterChange={setFilters}
              totalCount={totalCount}
              activeCount={activeCount}
              completedCount={completedCount}
            />

            <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-mono">
              <span>
                ПОКАЗАНО: <strong className="text-slate-300 font-bold">{filteredBookings.length}</strong> / {totalCount}
              </span>
              {filters.status !== 'all' && (
                <span className="text-emerald-400">
                  Фільтр: {filters.status === 'active' ? 'Активні' : 'Виконані'}
                </span>
              )}
            </div>

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

      {/* Лаконічний футер */}
      <footer className="border-t border-slate-900/80 py-5 text-center text-xs text-slate-600 font-mono relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>CyberClub &copy; 2026 &middot; Крос-платформне програмування &middot; ЛР № 4</span>
          <span className="text-slate-500">
            FSD &middot; React 19 &middot; Tailwind v4
          </span>
        </div>
      </footer>
    </div>
  );
};
