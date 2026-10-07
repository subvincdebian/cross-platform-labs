import React from 'react';
import { Activity } from 'lucide-react';

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
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
            <span className="text-base font-bold tracking-tight text-white font-sans">
              CYBER<span className="text-emerald-400">CLUB</span>
            </span>
          </div>
          <span className="text-slate-700 text-xs font-mono">/</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            <Activity className="w-3 h-3 text-emerald-400" />
            Live Arena
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
