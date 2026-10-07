import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'custom';
  customClass?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  customClass = '',
  className = '',
}) => {
  const variants = {
    default: 'border-slate-700 bg-slate-800 text-slate-300',
    success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    warning: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
    danger: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
    info: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
    custom: customClass,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
