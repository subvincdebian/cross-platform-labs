const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

/**
 * Отримання абсолютного шляху до файлу збереження notes.json
 * у системній директорії користувача (app.getPath('userData')).
 */
function getNotesFilePath() {
  const userDataDir = app.getPath('userData');
  return path.join(userDataDir, 'notes.json');
}

/**
 * Додатковий шлях до bookings.json для повної семантичної відповідності
 */
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

// ====================================================================
// ОБРОБНИКИ МІЖПРОЦЕСНОЇ ВЗАЄМОДІЇ (IPC HANDLERS)
// ====================================================================

function handleLoadData() {
  const filePath = getNotesFilePath();
  console.log('[IPC:main] Читання файлу даних:', filePath);

  if (!fs.existsSync(filePath)) {
    const backupPath = getBookingsFilePath();
    if (fs.existsSync(backupPath)) {
      try {
        const raw = fs.readFileSync(backupPath, 'utf-8');
        return JSON.parse(raw);
      } catch (err) {
        console.error('[IPC:main] Помилка читання backup файлу:', err.message);
        return [];
      }
    }
    return [];
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[IPC:main] Помилка читання або парсингу JSON:', err.message);
    return [];
  }
}

function handleSaveData(data) {
  const filePath = getNotesFilePath();
  const backupPath = getBookingsFilePath();
  const dirPath = path.dirname(filePath);

  console.log('[IPC:main] Збереження даних у файл:', filePath, `(елементів: ${Array.isArray(data) ? data.length : 0})`);

  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonString, 'utf-8');
    // Додаткова синхронізація з bookings.json
    fs.writeFileSync(backupPath, jsonString, 'utf-8');
    return true;
  } catch (err) {
    console.error('[IPC:main] Помилка запису файлу на диск:', err.message);
    return false;
  }
}

// Реєстрація каналів для Smart Notes (вимоги кафедральної методички)
ipcMain.handle('notes:load', () => handleLoadData());
ipcMain.handle('notes:save', (event, notes) => handleSaveData(notes));

// Реєстрація каналів для індивідуального варіанта CyberClub
ipcMain.handle('bookings:load', () => handleLoadData());
ipcMain.handle('bookings:save', (event, bookings) => handleSaveData(bookings));

// Допоміжний канал отримання інформації про додаток
ipcMain.handle('app:info', () => ({
  name: app.getName(),
  version: app.getVersion(),
  userData: app.getPath('userData'),
  notesPath: getNotesFilePath(),
  bookingsPath: getBookingsFilePath(),
  platform: process.platform,
}));

// ====================================================================
// ЖИТТЄВИЙ ЦИКЛ ЗАСТОСУНКУ (LIFECYCLE)
// ====================================================================

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
