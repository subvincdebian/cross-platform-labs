import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';
  size?: 'sm' | 'md';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary:
      'bg-emerald-400 text-slate-950 font-semibold hover:bg-emerald-300 hover:shadow-[0_0_20px_-3px_rgba(52,211,153,0.45)] border border-emerald-300/40',
    accent:
      'bg-violet-500 text-white font-medium hover:bg-violet-400 hover:shadow-[0_0_20px_-3px_rgba(167,139,250,0.45)] border border-violet-400/30',
    secondary:
      'bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white border border-slate-800 hover:border-slate-700',
    ghost:
      'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60',
    danger:
      'text-rose-400 hover:text-rose-200 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
