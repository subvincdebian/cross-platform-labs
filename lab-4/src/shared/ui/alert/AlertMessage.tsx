import React from 'react';
import { X } from 'lucide-react';

export interface AlertMessageProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({ type, message, onClose }) => {
  if (!message) return null;

  const styles = {
    success: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    error: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    info: 'text-slate-300 bg-slate-800/60 border-slate-700',
  };

  return (
    <div
      role="alert"
      className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-xs font-medium ${styles[type]}`}
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрити"
          className="text-slate-400 hover:text-slate-200 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
