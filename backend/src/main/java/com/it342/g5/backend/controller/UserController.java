package com.it342.g5.backend.controller;

import com.it342.g5.backend.dto.UserProfile;
import com.it342.g5.backend.service.AuthService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final AuthService authService;

    public UserController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/me")
    public UserProfile getProfile(Authentication authentication) {

        String userName = authentication.getName();
        
        if (userName == null) {
            throw new RuntimeException("User not authenticated");
        }

        return authService.getUserProfile(userName);
    }
}