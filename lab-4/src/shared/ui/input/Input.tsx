import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={inputId} className="text-xs text-slate-400">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full bg-slate-900 text-slate-100 placeholder-slate-600 text-sm rounded-lg px-3 py-2 border transition-colors outline-none ${
          error
            ? 'border-rose-500/80 focus:border-rose-500'
            : 'border-slate-800 hover:border-slate-700 focus:border-slate-500'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-rose-400 mt-0.5">{error}</span>}
    </div>
  );
};
