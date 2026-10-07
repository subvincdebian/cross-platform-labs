import React from 'react';
import { Gamepad2, CheckCircle2, Clock, Users, Banknote } from 'lucide-react';

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
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Бренд клубу */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-black">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-sans">
                  Cyber<span className="text-emerald-400">Club</span>
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  SPA v4
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Система онлайн-бронювання та обліку комп'ютерного клубу
              </p>
            </div>
          </div>

          {/* Інформаційні лічильники у шапці */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {/* Всього */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2 flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                  Всього
                </span>
                <span className="text-sm font-bold text-slate-100 font-mono">
                  {totalCount}
                </span>
              </div>
            </div>

            {/* Активні */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2 flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-semibold text-cyan-400 tracking-wider">
                  Активні
                </span>
                <span className="text-sm font-bold text-slate-100 font-mono">
                  {activeCount}
                </span>
              </div>
            </div>

            {/* Виконано */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2 flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-semibold text-emerald-400 tracking-wider">
                  Виконано
                </span>
                <span className="text-sm font-bold text-slate-100 font-mono">
                  {completedCount}
                </span>
              </div>
            </div>

            {/* Загальний оборот */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2 flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                <Banknote className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-semibold text-purple-400 tracking-wider">
                  Каса
                </span>
                <span className="text-sm font-bold text-emerald-400 font-mono">
                  {totalRevenue} ₴
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
