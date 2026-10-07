import React from 'react';

export interface HeaderProps {
  totalCount: number;
  activeCount: number;
  completedCount: number;
  totalRevenue: number;
}

export const Header: React.FC<HeaderProps> = ({
  totalCount,
  activeCount,
  completedCount,
  totalRevenue,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Логотип */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-100 tracking-tight text-base">
            CyberClub
          </span>
          <span className="text-slate-600 text-sm">/</span>
          <span className="text-xs text-slate-400">Бронювання</span>
        </div>

        {/* Статистика */}
        <div className="flex items-center gap-3 sm:gap-5 text-xs text-slate-400">
          <div>
            Всього: <span className="font-medium text-slate-200">{totalCount}</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">&middot;</span>
          <div>
            Активні: <span className="font-medium text-slate-200">{activeCount}</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">&middot;</span>
          <div>
            Виконано: <span className="font-medium text-slate-200">{completedCount}</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">&middot;</span>
          <div>
            Каса: <span className="font-semibold text-slate-100">{totalRevenue} ₴</span>
          </div>
        </div>
      </div>
    </header>
  );
};
