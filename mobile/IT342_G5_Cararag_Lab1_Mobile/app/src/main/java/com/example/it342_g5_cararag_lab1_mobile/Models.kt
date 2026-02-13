package com.example.it342_g5_cararag_lab1_mobile

import com.google.gson.annotations.SerializedName

/**
 * Data Transfer Objects (DTOs)
 * These must match the Java classes in your backend /dto folder.
 */

data class RegisterDTO(
    val firstName: String,
    val lastName: String,
    val email: String,
    val username: String,
    val password: String
)

data class LoginDTO(
    val username: String,
    val password: String
)

data class AuthResponse(
    val token: String,
    val message: String,
    val username: String
)

data class UserProfile(
    val id: Int,
    // Using SerializedName ensures it matches "userName" from your Spring Boot DTO
    @SerializedName("userName")
    val userName: String,
    val firstName: String,
    val lastName: String,
    val email: String
)