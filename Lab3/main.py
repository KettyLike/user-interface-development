import sys
from PySide6.QtWidgets import QApplication
from views.main_window import MainWindow


# Точка входу: створення Qt-застосунку та запуск головного вікна
def main():
    app = QApplication(sys.argv)

    # Ініціалізація та показ головного вікна редактора
    window = MainWindow()
    window.show()

    # Передача керування циклу обробки подій застосунку
    sys.exit(app.exec())


# Запуск застосунку тільки при прямому запуску цього файлу
if __name__ == "__main__":
    main()
