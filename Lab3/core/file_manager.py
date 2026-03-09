class FileManager:

    @staticmethod
    def read_file(path):
        # Зчитування вмісту текстового файлу у кодуванні UTF-8
        with open(path, "r", encoding="utf-8") as f:
            return f.read()

    @staticmethod
    def write_file(path, text):
        # Запис переданого тексту у файл у кодуванні UTF-8
        with open(path, "w", encoding="utf-8") as f:
            f.write(text)
