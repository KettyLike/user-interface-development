using Microsoft.Win32;
using System.IO;
using System.Windows;

namespace TextEditor
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        // Відкриття файлу
        private void Open_Click(object sender, RoutedEventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            if (openFileDialog.ShowDialog() == true)
            {
                textBox.Text = File.ReadAllText(openFileDialog.FileName);
            }
        }

        // Збереження файлу
        private void Save_Click(object sender, RoutedEventArgs e)
        {
            SaveFileDialog saveFileDialog = new SaveFileDialog();
            if (saveFileDialog.ShowDialog() == true)
            {
                File.WriteAllText(saveFileDialog.FileName, textBox.Text);
            }
        }

        // Очищення файлу/відкриття нового
        private void New_Click(object sender, RoutedEventArgs e)
        {
            textBox.Clear();
        }

        // Закриття програми
        private void Exit_Click(object sender, RoutedEventArgs e)
        {
            Application.Current.Shutdown();
        }
    }
}
