package com.example.it342_g5_cararag_lab1_mobile

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch

class RegisterActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        val btnRegister = findViewById<Button>(R.id.btnRegister)

        btnRegister.setOnClickListener {
            val registerData = RegisterDTO(
                firstName = findViewById<EditText>(R.id.etFirstName).text.toString(),
                lastName = findViewById<EditText>(R.id.etLastName).text.toString(),
                email = findViewById<EditText>(R.id.etEmail).text.toString(),
                username = findViewById<EditText>(R.id.etUsername).text.toString(),
                password = findViewById<EditText>(R.id.etPassword).text.toString()
            )

            lifecycleScope.launch {
                try {
                    val response = RetrofitClient.instance.register(registerData)
                    if (response.isSuccessful) {
                        Toast.makeText(this@RegisterActivity, "Registration Successful", Toast.LENGTH_SHORT).show()
                        finish() // Go back to Login
                    }
                } catch (e: Exception) {
                    Toast.makeText(this@RegisterActivity, "Server Error", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }
}