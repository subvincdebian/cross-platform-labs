import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
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
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-slate-100 text-slate-900 hover:bg-white active:bg-slate-200',
    secondary:
      'bg-slate-800 text-slate-200 hover:bg-slate-700/80 active:bg-slate-700 border border-slate-700',
    ghost:
      'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 active:bg-slate-800',
    danger:
      'text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 active:bg-rose-500/20',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-3.5 py-2 gap-2',
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
