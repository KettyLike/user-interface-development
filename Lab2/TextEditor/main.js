const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

// Вимкнення апаратного прискорення 
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('disable-gpu-compositing');
app.commandLine.appendSwitch('disable-accelerated-2d-canvas');
app.commandLine.appendSwitch('disable-accelerated-video-decode');
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('in-process-gpu');

// Оголошення головного вікна застосунку та шляху до поточного файлу
let mainWindow;
let currentFile = null;

// Функція для запуску головного вікна редактора
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile('index.html');
}

// Створення верхнього меню з діями для файлів
function createMenu() {
    const template = [
        {
            label: 'Файл',
            submenu: [
                {
                    label: 'Новий',
                    click: () => {
                        // Скидання поточного файлу й очищення редактора
                        currentFile = null;
                        mainWindow.webContents.send('file-new');
                    }
                },
                {
                    label: 'Відкрити',
                    click: async () => {
                        // Відкриття діалогу вибору текстового файлу
                        const result = await dialog.showOpenDialog({
                            properties: ['openFile'],
                            filters: [{ name: 'Text Files', extensions: ['txt'] }]
                        });

                        if (!result.canceled) {
                            // Зчитування вмісту файлу та передача його в renderer
                            currentFile = result.filePaths[0];
                            const data = fs.readFileSync(currentFile, 'utf-8');
                            mainWindow.webContents.send('file-open', data);
                        }
                    }
                },
                {
                    label: 'Зберегти',
                    click: async () => {
                        // Надсилання запиту в renderer на передачу вмісту для збереження
                        const content = await mainWindow.webContents.send('request-content');
                    }
                },
                { type: 'separator' },
                { role: 'quit', label: 'Вихід' }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// Додавання IPC-обробника для збереження файлу
ipcMain.handle('save-file', async (event, content) => {
    const result = await dialog.showSaveDialog({
        filters: [{ name: 'Text Files', extensions: ['txt'] }]
    });

    if (result.canceled) return;

    fs.writeFileSync(result.filePath, content);
});

// Створення вікна й меню після запуску застосунку
app.whenReady().then(() => {
    createWindow();
    createMenu();
});
