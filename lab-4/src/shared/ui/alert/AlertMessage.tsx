import React from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export interface AlertMessageProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({ type, message, onClose }) => {
  if (!message) return null;

  const styles = {
    success: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300',
    error: 'bg-rose-500/10 border-rose-500/40 text-rose-300',
    info: 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
  };

  return (
    <div
      role="alert"
      className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-sm transition-all duration-200 animate-in fade-in slide-in-from-top-2 ${styles[type]}`}
    >
      <div className="flex items-center gap-2.5">
        {icons[type]}
        <span className="font-medium">{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрити сповіщення"
          className="text-slate-400 hover:text-slate-200 p-0.5 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
