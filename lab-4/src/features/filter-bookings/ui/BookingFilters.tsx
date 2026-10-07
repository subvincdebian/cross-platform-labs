import React from 'react';
import { Search } from 'lucide-react';
import { BookingFiltersState, BookingStatusFilter } from '@/entities/booking';
import { GAMING_ZONES } from '@/shared/config/zones';

export interface BookingFiltersProps {
  filters: BookingFiltersState;
  onFilterChange: (filters: BookingFiltersState) => void;
  totalCount: number;
  activeCount: number;
  completedCount: number;
}

export const BookingFilters: React.FC<BookingFiltersProps> = ({
  filters,
  onFilterChange,
  totalCount,
  activeCount,
  completedCount,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleStatusChange = (status: BookingStatusFilter) => {
    onFilterChange({ ...filters, status });
  };

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, zoneId: e.target.value });
  };

  const statusOptions: { id: BookingStatusFilter; label: string; count: number }[] = [
    { id: 'all', label: 'Всі', count: totalCount },
    { id: 'active', label: 'Активні', count: activeCount },
    { id: 'completed', label: 'Виконано', count: completedCount },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
      {/* Сегментований перемикач статусу */}
      <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
        {statusOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => handleStatusChange(opt.id)}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              filters.status === opt.id
                ? 'bg-slate-800 text-slate-100 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {opt.label} <span className="text-slate-500 ml-1">{opt.count}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 flex-1 sm:max-w-xs">
        {/* Пошук */}
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Пошук..."
            className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 text-xs rounded-lg pl-8 pr-2.5 py-1.5 border border-slate-800 hover:border-slate-700 focus:border-slate-500 outline-none transition-colors"
          />
        </div>

        {/* Фільтр зони */}
        <select
          value={filters.zoneId}
          onChange={handleZoneChange}
          className="bg-slate-900 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 border border-slate-800 hover:border-slate-700 focus:border-slate-500 outline-none cursor-pointer"
        >
          <option value="all">Усі зони</option>
          {GAMING_ZONES.map((z) => (
            <option key={z.id} value={z.id}>
              {z.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
