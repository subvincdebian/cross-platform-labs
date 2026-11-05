let messageTimer = null;

export const notificationService = {
  show(target, text, type = 'info', durationMs = 4000) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;

    const colors = {
      error: '#ef4444',
      success: '#10b981',
      warning: '#f59e0b',
      info: '#38bdf8',
    };

    el.textContent = text;
    el.style.color = colors[type] || colors.info;
    el.style.fontWeight = '600';
    el.style.display = 'block';

    if (messageTimer) {
      clearTimeout(messageTimer);
    }

    messageTimer = setTimeout(() => {
      el.textContent = '';
      messageTimer = null;
    }, durationMs);
  },

  clear(target) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) el.textContent = '';
    if (messageTimer) {
      clearTimeout(messageTimer);
      messageTimer = null;
    }
  },
};
