package com.example.lab4

import android.net.Uri
import android.os.Bundle
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import android.view.Menu
import android.view.MenuItem
import androidx.activity.result.contract.ActivityResultContracts

class MainActivity : AppCompatActivity() {

    private lateinit var editText: EditText
    private var currentUri: Uri? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val toolbar = findViewById<Toolbar>(R.id.toolbar)
        setSupportActionBar(toolbar)

        editText = findViewById(R.id.editText)
    }

    // Підключення меню Toolbar
    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.main_menu, menu)
        return true
    }

    // Обробка натискань меню
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.newFile -> {
                editText.setText("")
                currentUri = null
            }

            R.id.openFile -> openFile()
            R.id.saveFile -> saveFile()
            R.id.exitApp -> finish()
        }
        return true
    }

    // Лаунчери для відкриття/збереження/створення файлу
    private val openLauncher =
        registerForActivityResult(ActivityResultContracts.OpenDocument()) { uri ->
            uri?.let {
                contentResolver.openInputStream(it)?.bufferedReader().use { reader ->
                    editText.setText(reader?.readText())
                    currentUri = it
                }
            }
        }

    private fun openFile() {
        openLauncher.launch(arrayOf("text/plain"))
    }

    private val saveLauncher =
        registerForActivityResult(ActivityResultContracts.CreateDocument("text/plain")) { uri ->
            uri?.let {
                contentResolver.openOutputStream(it)?.use { stream ->
                    stream.write(editText.text.toString().toByteArray())
                    currentUri = it
                }
            }
        }

    private fun saveFile() {
        if (currentUri != null) {
            contentResolver.openOutputStream(currentUri!!)?.use {
                it.write(editText.text.toString().toByteArray())
            }
        } else {
            saveLauncher.launch("file.txt")
        }
    }
}