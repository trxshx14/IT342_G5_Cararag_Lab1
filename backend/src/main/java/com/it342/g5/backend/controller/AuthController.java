package com.it342.g5.backend.controller;

import com.it342.g5.backend.dto.*;
import com.it342.g5.backend.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterDTO dto) {
        return authService.registerUser(dto);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginDTO dto) {
        return authService.loginUser(dto);
    }
}
