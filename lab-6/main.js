const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function getBookingsFilePath() {
  const userDataDir = app.getPath('userData');
  return path.join(userDataDir, 'bookings.json');
}

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 760,
    minWidth: 780,
    minHeight: 580,
    title: 'CyberClub Desktop',
    backgroundColor: '#0b0f19',
    autoHideMenuBar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function handleLoadBookings() {
  const filePath = getBookingsFilePath();
  console.log('[IPC:main] Читання файлу бронювань:', filePath);

  if (!fs.existsSync(filePath)) {
    return [];
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[IPC:main] Помилка читання або розбору JSON:', err.message);
    return [];
  }
}

function handleSaveBookings(bookings) {
  const filePath = getBookingsFilePath();
  const dirPath = path.dirname(filePath);

  console.log('[IPC:main] Збереження бронювань у файл:', filePath, `(кількість: ${Array.isArray(bookings) ? bookings.length : 0})`);

  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const jsonString = JSON.stringify(bookings, null, 2);
    fs.writeFileSync(filePath, jsonString, 'utf-8');
    return true;
  } catch (err) {
    console.error('[IPC:main] Помилка запису файлу на диск:', err.message);
    return false;
  }
}

ipcMain.handle('bookings:load', () => handleLoadBookings());
ipcMain.handle('bookings:save', (event, bookings) => handleSaveBookings(bookings));

ipcMain.handle('app:info', () => ({
  name: app.getName(),
  version: app.getVersion(),
  userData: app.getPath('userData'),
  filePath: getBookingsFilePath(),
  platform: process.platform,
}));

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
