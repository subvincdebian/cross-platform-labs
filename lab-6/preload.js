const { contextBridge, ipcRenderer } = require('electron');

/**
 * Preload-скрипт десктопного застосунку CyberClub Desktop.
 * 
 * Безпечна ізоляція контексту (Context Isolation):
 * - Рендер-процес не має прямого доступу до Node.js (require, fs, process тощо).
 * - Усі операції з файловою системою та ОС виконуються виключно через
 *   декларовані IPC-канали методом ipcRenderer.invoke.
 */

// 1. Інтерфейс для індивідуального варіанта CyberClub (бронювання клубу)
contextBridge.exposeInMainWorld('cyberClubAPI', {
  loadBookings: () => ipcRenderer.invoke('bookings:load'),
  saveBookings: (bookings) => ipcRenderer.invoke('bookings:save', bookings),
  getAppInfo: () => ipcRenderer.invoke('app:info'),
});

// 2. Інтерфейс для повної сумісності з вимогами та автотестами методички (Smart Notes API)
contextBridge.exposeInMainWorld('notesAPI', {
  loadNotes: () => ipcRenderer.invoke('notes:load'),
  saveNotes: (notes) => ipcRenderer.invoke('notes:save', notes),
});
