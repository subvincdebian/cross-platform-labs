import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => {
  return (
    <span className={`text-xs text-slate-400 font-medium ${className}`}>
      {children}
    </span>
  );
};
