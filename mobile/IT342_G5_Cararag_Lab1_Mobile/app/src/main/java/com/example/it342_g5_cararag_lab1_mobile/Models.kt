package com.example.it342_g5_cararag_lab1_mobile

import com.google.gson.annotations.SerializedName


data class RegisterDTO(
    val firstName: String,
    val lastName: String,
    val email: String,
    @SerializedName("userName")
    val username: String,
    val password: String,
    val confirmPassword: String
)

data class LoginDTO(
    @SerializedName("userName")
    val username: String,
    val password: String
)

data class AuthResponse(
    val token: String,
    val message: String,
    @SerializedName("userName")
    val username: String
)

data class UserProfile(
    @SerializedName("userId")
    val id: Int,
    @SerializedName("userName")
    val userName: String,
    val firstName: String,
    val lastName: String,
    val email: String
)