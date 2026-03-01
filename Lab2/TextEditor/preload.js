const { contextBridge, ipcRenderer } = require('electron');

// Безпечна передача в renderer лише потрібних методів
contextBridge.exposeInMainWorld('api', {

    // Додавання події створення нового документа
    onFileNew: (callback) => ipcRenderer.on('file-new', callback),

    // Додавання події відкриття файлу з передачею його вмісту
    onFileOpen: (callback) => ipcRenderer.on('file-open', (event, data) => callback(data)),

    // Додавання виклику збереження з переданим текстом
    saveFile: (content) => ipcRenderer.invoke('save-file', content),

    // Додавання обробки запиту на збереження з передачею поточного тексту
    requestSave: () => ipcRenderer.on('request-content', async () => {
        const content = document.getElementById('editor').value;
        await ipcRenderer.invoke('save-file', content);
    })

});

