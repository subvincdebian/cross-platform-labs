import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BookingsService } from '@cyberclub/core';
import { FileStorageAdapter } from './adapters/fileStorageAdapter.js';
import { createHandlers } from './ipcHandlers.js';

const rendererUrl = new URL('./renderer/index.html', import.meta.url);
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 860,
    minWidth: 420,
    backgroundColor: '#0b0f19',
    webPreferences: {
      preload: fileURLToPath(new URL('./preload.cjs', import.meta.url)),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });
  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  mainWindow.webContents.on('will-navigate', (event) => event.preventDefault());
  mainWindow.loadURL(rendererUrl.href);
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.whenReady().then(() => {
    const storage = new FileStorageAdapter(join(app.getPath('userData'), 'bookings.json'));
    const handlers = createHandlers(new BookingsService(storage));

    for (const [action, handler] of Object.entries(handlers)) {
      ipcMain.handle(`bookings:${action}`, (event, input) => {
        if (event.sender !== mainWindow?.webContents ||
            event.senderFrame !== mainWindow.webContents.mainFrame ||
            event.senderFrame.url !== rendererUrl.href) {
          throw new Error('Недозволене джерело IPC.');
        }
        return handler(input);
      });
    }

    createWindow();
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on('second-instance', () => {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}
