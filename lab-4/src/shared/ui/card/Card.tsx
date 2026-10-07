import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glow';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-xl p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
