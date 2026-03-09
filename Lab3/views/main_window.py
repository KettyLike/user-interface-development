from PySide6.QtWidgets import (
    QMainWindow,
    QTextEdit,
    QFileDialog
)
from PySide6.QtGui import QAction

from core.file_manager import FileManager


class MainWindow(QMainWindow):

    def __init__(self):
        super().__init__()

        # Налаштування параметрів головного вікна
        self.setWindowTitle("Text Editor")
        self.resize(800, 600)

        # Центральний текстовий редактор
        self.text_edit = QTextEdit()
        self.setCentralWidget(self.text_edit)

        # Побудова верхнього меню з діями для файлів
        self.create_menu()

    def create_menu(self):
        # Створення меню "File" та додавання пунктів керування документом
        menu_bar = self.menuBar()
        file_menu = menu_bar.addMenu("File")

        # Дія створення нового документа
        new_action = QAction("New", self)
        new_action.triggered.connect(self.new_file)

        # Дія відкриття файлу з диска
        open_action = QAction("Open", self)
        open_action.triggered.connect(self.open_file)

        # Дія збереження поточного тексту у файл
        save_action = QAction("Save", self)
        save_action.triggered.connect(self.save_file)

        # Дія завершення роботи застосунку
        exit_action = QAction("Exit", self)
        exit_action.triggered.connect(self.close)

        # Додавання всіх дій у меню "File"
        file_menu.addAction(new_action)
        file_menu.addAction(open_action)
        file_menu.addAction(save_action)
        file_menu.addSeparator()
        file_menu.addAction(exit_action)

    def new_file(self):
        # Очищення редактора для нового документа
        self.text_edit.clear()

    def open_file(self):
        # Відкриття діалогу вибору файлу
        path, _ = QFileDialog.getOpenFileName(self, "Open file")

        if path:
            # Зчитування тексту з файлу та відображення у редакторі
            text = FileManager.read_file(path)
            self.text_edit.setText(text)

    def save_file(self):
        # Відкриття діалогу збереження файлу
        path, _ = QFileDialog.getSaveFileName(self, "Save file")

        if path:
            # Запис поточного тексту редактора у вибраний файл
            FileManager.write_file(path, self.text_edit.toPlainText())
