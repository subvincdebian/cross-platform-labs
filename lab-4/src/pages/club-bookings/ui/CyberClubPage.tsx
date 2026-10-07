import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '@/widgets/header';
import { BookingForm } from '@/widgets/booking-form';
import { BookingList } from '@/widgets/booking-list';
import { BookingFilters } from '@/features/filter-bookings';
import { Booking, BookingFiltersState } from '@/entities/booking';
import { loadFromStorage, saveToStorage } from '@/shared/lib/storage';
import { STORAGE_KEY } from '@/shared/config/zones';

// Стартові демо-дані для першого запуску застосунку
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
    notes: 'Праки з командою NaVi Youth',
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
    notes: 'Калібровка у Dota 2',
    done: true,
    createdAt: new Date().toISOString(),
  },
];

export const CyberClubPage: React.FC = () => {
  // 1. Стан списку бронювань з ініціалізацією з localStorage
  const [bookings, setBookings] = useState<Booking[]>(() => {
    return loadFromStorage<Booking[]>(STORAGE_KEY, INITIAL_BOOKINGS);
  });

  // 2. Стан фільтрів та пошуку
  const [filters, setFilters] = useState<BookingFiltersState>({
    search: '',
    status: 'all',
    zoneId: 'all',
  });

  // 3. Синхронізація з localStorage через useEffect
  useEffect(() => {
    saveToStorage(STORAGE_KEY, bookings);
  }, [bookings]);

  // Додавання нового бронювання
  const handleAddBooking = (data: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...data,
      id: `booking-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Перемикання статусу (активне <-> виконано)
  const handleToggleStatus = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, done: !b.done } : b))
    );
  };

  // Видалення бронювання
  const handleDeleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // Підрахунок статистики для шапки
  const totalCount = bookings.length;
  const activeCount = useMemo(() => bookings.filter((b) => !b.done).length, [bookings]);
  const completedCount = useMemo(() => bookings.filter((b) => b.done).length, [bookings]);
  const totalRevenue = useMemo(
    () => bookings.reduce((sum, b) => sum + b.price, 0),
    [bookings]
  );

  // Фільтрація списку «на льоту» методом .filter()
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // Фільтр за пошуковим запитом
      const query = filters.search.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        b.playerName.toLowerCase().includes(query) ||
        b.zoneName.toLowerCase().includes(query) ||
        (b.notes && b.notes.toLowerCase().includes(query)) ||
        b.pcNumber.toString().includes(query);

      // Фільтр за станом виконання
      let matchesStatus = true;
      if (filters.status === 'active') matchesStatus = !b.done;
      if (filters.status === 'completed') matchesStatus = b.done;

      // Фільтр за зоною
      const matchesZone =
        filters.zoneId === 'all' || b.zoneId === filters.zoneId;

      return matchesSearch && matchesStatus && matchesZone;
    });
  }, [bookings, filters]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Шапка застосунку */}
      <Header
        totalCount={totalCount}
        activeCount={activeCount}
        completedCount={completedCount}
        totalRevenue={totalRevenue}
      />

      {/* Основний вміст */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Ліва колонка: Форма створення бронювання */}
          <div className="lg:col-span-5 w-full lg:sticky lg:top-24">
            <BookingForm onAddBooking={handleAddBooking} />
          </div>

          {/* Права колонка: Фільтри та список бронювань */}
          <div className="lg:col-span-7 flex flex-col gap-4 w-full">
            <BookingFilters
              filters={filters}
              onFilterChange={setFilters}
              totalCount={totalCount}
              activeCount={activeCount}
              completedCount={completedCount}
            />

            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>
                Показано: <strong className="text-slate-200">{filteredBookings.length}</strong> з{' '}
                <strong className="text-slate-200">{totalCount}</strong> записів
              </span>
              {filters.status !== 'all' && (
                <span className="text-emerald-400 font-medium">
                  Режим фільтра: {filters.status === 'active' ? 'Активні' : 'Виконані'}
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

      {/* Підвал */}
      <footer className="border-t border-slate-900 bg-slate-950/60 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>CyberClub &copy; 2026. Крос-платформне програмування (КПП) - Лабораторна робота № 4</span>
          <span className="text-slate-400 font-mono text-[11px]">
            React 19 &bull; Vite &bull; Tailwind CSS v4 &bull; FSD Architecture
          </span>
        </div>
      </footer>
    </div>
  );
};
