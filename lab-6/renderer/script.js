import { bootstrapApp } from './src/app/index.js';

/**
 * Точка входу рендер-процесу CyberClub Desktop.
 * Повна реалізація за архітектурою Feature-Sliced Design (src/).
 */

window.addEventListener('DOMContentLoaded', async () => {
  console.log('[CyberClub Desktop] Ініціалізація Feature-Sliced Design застосунку...');
  await bootstrapApp();
});
