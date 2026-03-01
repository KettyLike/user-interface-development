using System;
using System.IO;
using System.Windows.Forms;

namespace TextEditor
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
        }

        // Очищення файлу/відкриття нового
        private void newToolStripMenuItem_Click(object sender, EventArgs e)
        {
            textField.Clear();
        }

        // Відкриття файлу
        private void openToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (openFileDialog1.ShowDialog() == DialogResult.OK)
            {
                textField.Text = File.ReadAllText(openFileDialog1.FileName);
            }
        }

        // Збереження файлу
        private void saveToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (saveFileDialog1.ShowDialog() == DialogResult.OK)
            {
                File.WriteAllText(saveFileDialog1.FileName, textField.Text);
            }
        }

        // Закриття програми
        private void exitToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }
    }
}
