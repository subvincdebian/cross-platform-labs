import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full bg-slate-900/80 text-slate-100 placeholder-slate-500 text-sm rounded-xl px-3.5 py-2.5 border transition-all duration-200 outline-none focus:ring-2 ${
          error
            ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20'
            : 'border-slate-700/80 hover:border-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-rose-400 font-medium">{error}</span>}
      {helperText && !error && <span className="text-xs text-slate-400">{helperText}</span>}
    </div>
  );
};
