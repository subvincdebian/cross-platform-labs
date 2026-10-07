import React from 'react';
import { Gamepad2 } from 'lucide-react';

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
    <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Бренд */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <span className="text-base font-bold tracking-tight text-white font-sans">
            CYBER<span className="text-emerald-400">CLUB</span>
          </span>
        </div>

        {/* Метрики */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800/60">
            <span className="text-slate-500 text-[11px]">ВСЬОГО</span>
            <span className="font-semibold text-slate-100">{totalCount}</span>
          </div>

          <div className="flex items-center gap-1.5 text-sky-400 bg-sky-500/5 px-2.5 py-1 rounded-lg border border-sky-500/20">
            <span className="text-sky-500 text-[11px]">АКТИВНІ</span>
            <span className="font-semibold text-sky-300">{activeCount}</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            <span className="text-emerald-500 text-[11px]">ГОТОВО</span>
            <span className="font-semibold text-emerald-300">{completedCount}</span>
          </div>

          <div className="flex items-center gap-1.5 text-violet-300 bg-violet-500/10 px-3 py-1 rounded-lg border border-violet-500/20 font-semibold">
            <span className="text-violet-400 text-[11px]">КАСА</span>
            <span>{totalRevenue} ₴</span>
          </div>
        </div>
      </div>
    </header>
  );
};
