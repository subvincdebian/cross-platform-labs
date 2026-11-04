const { contextBridge, ipcRenderer } = require('electron');

/**
 * Preload-скрипт десктопного застосунку CyberClub Desktop.
 * 
 * Безпечна ізоляція контексту (Context Isolation):
 * - Рендер-процес не має прямого доступу до Node.js (require, fs, process тощо).
 * - Усі операції з файловою системою та збереженням виконуються виключно через
 *   декларовані IPC-канали методом ipcRenderer.invoke.
 */

contextBridge.exposeInMainWorld('cyberClubAPI', {
  loadBookings: () => ipcRenderer.invoke('bookings:load'),
  saveBookings: (bookings) => ipcRenderer.invoke('bookings:save', bookings),
  getAppInfo: () => ipcRenderer.invoke('app:info'),
});
