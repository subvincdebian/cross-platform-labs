import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  badge?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  badge,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <div className="flex items-center justify-between text-xs">
          <label htmlFor={inputId} className="font-medium text-slate-300">
            {label}
          </label>
          {badge && <span className="text-[11px] text-slate-500 font-mono">{badge}</span>}
        </div>
      )}
      <input
        id={inputId}
        className={`w-full bg-slate-900/80 text-slate-100 placeholder-slate-600 text-sm rounded-lg px-3 py-2 border transition-all outline-none ${
          error
            ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30'
            : 'border-slate-800 hover:border-slate-700 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/20'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-rose-400 font-medium">{error}</span>}
    </div>
  );
};
