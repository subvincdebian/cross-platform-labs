import { bootstrapApp } from './src/app/index.js';

/**
 * Точка входу рендер-процесу CyberClub Desktop.
 * Поєднує чисту архітектуру Feature-Sliced Design (src/)
 * із вимогами лабораторної роботи №6 кафедральної методички.
 */

// Запуск FSD-застосунку після завантаження DOM-дерева
window.addEventListener('DOMContentLoaded', async () => {
  console.log('[CyberClub Desktop] Ініціалізація Feature-Sliced Design інтерфейсу...');
  await bootstrapApp();
});

// Експорт глобальних аліасів для налагодження у DevTools (Крок 10.5 методички)
export async function addNote() {
  const noteInput = document.getElementById('noteInput') || document.getElementById('playerNameInput');
  const addBtn = document.getElementById('addNoteButton') || document.getElementById('bookButton');
  if (addBtn) addBtn.click();
}

window.addNote = addNote;
