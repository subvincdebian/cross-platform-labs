import React from 'react';
import { Search, Filter, X } from 'lucide-react';
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

  const handleReset = () => {
    onFilterChange({ search: '', status: 'all', zoneId: 'all' });
  };

  const hasActiveFilters = filters.search !== '' || filters.status !== 'all' || filters.zoneId !== 'all';

  const statusButtons: { id: BookingStatusFilter; label: string; count: number }[] = [
    { id: 'all', label: 'Всі', count: totalCount },
    { id: 'active', label: 'Активні', count: activeCount },
    { id: 'completed', label: 'Виконано', count: completedCount },
  ];

  return (
    <div className="flex flex-col gap-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Пошуковий інпут */}
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Швидкий пошук за нікнеймом або коментарем..."
            className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-10 py-2.5 border border-slate-700/80 hover:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ ...filters, search: '' })}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Фільтр за зоною клубу */}
        <div className="w-full md:w-60">
          <select
            value={filters.zoneId}
            onChange={handleZoneChange}
            className="w-full bg-slate-900/90 text-slate-200 text-sm rounded-xl px-3.5 py-2.5 border border-slate-700/80 hover:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all cursor-pointer"
          >
            <option value="all">Усі ігрові зони</option>
            {GAMING_ZONES.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Таби статусу: Всі / Активні / Виконано */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
        <div className="flex flex-wrap items-center gap-1.5">
          {statusButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => handleStatusChange(btn.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                filters.status === btn.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{btn.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  filters.status === btn.id
                    ? 'bg-slate-950/20 text-slate-950 font-bold'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {btn.count}
              </span>
            </button>
          ))}
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Filter className="w-3 h-3" />
            <span>Скинути фільтри</span>
          </button>
        )}
      </div>
    </div>
  );
};
