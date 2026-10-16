import { Alert, Platform } from 'react-native';

/**
 * Кросплатформний поліфіл для Alert.alert у web-середовищі (емулятори, розширення браузера, VS Code).
 * На Android та iOS використовується стандартний нативний Alert.alert операційної системи.
 */
if (Platform.OS === 'web' && typeof window !== 'undefined') {
  Alert.alert = (title, message, buttons) => {
    const fullText = [title, message].filter(Boolean).join('\n\n');

    if (buttons && buttons.length > 1) {
      // Кнопки типу "Видалити" / "Скасувати"
      const confirmed = window.confirm(fullText);
      if (confirmed) {
        const confirmBtn = buttons.find(
          (b) => b.style === 'destructive' || b.text === 'Видалити' || b.text === 'OK'
        );
        confirmBtn?.onPress?.();
      } else {
        const cancelBtn = buttons.find(
          (b) => b.style === 'cancel' || b.text === 'Скасувати'
        );
        cancelBtn?.onPress?.();
      }
    } else {
      // Звичайне сповіщення (Помилка / Успіх)
      window.alert(fullText);
      buttons?.[0]?.onPress?.();
    }
  };
}
