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

  const statusOptions: { id: BookingStatusFilter; label: string; count: number; activeColor: string }[] = [
    { id: 'all', label: 'Всі', count: totalCount, activeColor: 'text-slate-100' },
    { id: 'active', label: 'Активні', count: activeCount, activeColor: 'text-sky-400' },
    { id: 'completed', label: 'Виконано', count: completedCount, activeColor: 'text-emerald-400' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/40 p-1.5 rounded-xl border border-slate-800/80">
      {/* Сегментовані таби */}
      <div className="flex items-center bg-slate-950/60 p-1 rounded-lg border border-slate-800/60 text-xs">
        {statusOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => handleStatusChange(opt.id)}
            className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              filters.status === opt.id
                ? `bg-slate-800 ${opt.activeColor} shadow-sm border border-slate-700/60`
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{opt.label}</span>
            <span className="font-mono text-[11px] opacity-70">({opt.count})</span>
          </button>
        ))}
      </div>

      {/* Пошук та зона */}
      <div className="flex items-center gap-2 flex-1 sm:max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Пошук за нікнеймом або коментарем..."
            className="w-full bg-slate-950/60 text-slate-100 placeholder-slate-500 text-xs rounded-lg pl-8 pr-2.5 py-1.5 border border-slate-800 hover:border-slate-700 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all"
          />
        </div>

        <select
          value={filters.zoneId}
          onChange={handleZoneChange}
          className="bg-slate-950/60 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 border border-slate-800 hover:border-slate-700 focus:border-emerald-500/80 outline-none cursor-pointer"
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
