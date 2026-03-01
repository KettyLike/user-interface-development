// Очищення редактора при створенні нового файлу
window.api.onFileNew(() => {
    document.getElementById('editor').value = '';
});

// Заповнення редактора текстом відкритого файлу
window.api.onFileOpen((data) => {
    document.getElementById('editor').value = data;
});

// Підписка на запит збереження від main-процесу
window.api.requestSave();

