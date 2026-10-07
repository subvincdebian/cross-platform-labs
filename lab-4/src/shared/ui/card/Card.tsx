import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: 'none' | 'emerald' | 'cyan' | 'purple';
}

export const Card: React.FC<CardProps> = ({
  children,
  glow = 'none',
  className = '',
  ...props
}) => {
  const glowStyles = {
    none: 'border-slate-800 bg-slate-900/60 shadow-xl',
    emerald: 'border-emerald-500/30 bg-slate-900/70 shadow-xl shadow-emerald-500/5',
    cyan: 'border-cyan-500/30 bg-slate-900/70 shadow-xl shadow-cyan-500/5',
    purple: 'border-purple-500/30 bg-slate-900/70 shadow-xl shadow-purple-500/5',
  };

  return (
    <div
      className={`rounded-2xl border backdrop-blur-md p-5 transition-all duration-200 ${glowStyles[glow]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
