const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('cyberClubAPI', {
  list: (query) => ipcRenderer.invoke('bookings:list', query),
  add: (input) => ipcRenderer.invoke('bookings:add', input),
  remove: (id) => ipcRenderer.invoke('bookings:remove', id),
});
