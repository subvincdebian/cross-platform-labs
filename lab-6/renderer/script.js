import { bootstrapApp } from './src/app/index.js';


window.addEventListener('DOMContentLoaded', async () => {
  console.log('[CyberClub Desktop] Ініціалізація Feature-Sliced Design застосунку...');
  await bootstrapApp();
});
