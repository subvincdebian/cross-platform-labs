const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('cyberClubAPI', {
  loadBookings: () => ipcRenderer.invoke('bookings:load'),
  saveBookings: (bookings) => ipcRenderer.invoke('bookings:save', bookings),
  getAppInfo: () => ipcRenderer.invoke('app:info'),
});
