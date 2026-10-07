import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 transition-colors ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
