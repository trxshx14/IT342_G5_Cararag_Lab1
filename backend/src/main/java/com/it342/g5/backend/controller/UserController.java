package com.it342.g5.backend.controller;

import com.it342.g5.backend.dto.UserProfile;
import com.it342.g5.backend.security.TokenProvider;
import com.it342.g5.backend.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    private final TokenProvider tokenProvider;
    private final AuthService authService;

    public UserController(TokenProvider tokenProvider, AuthService authService) {
        this.tokenProvider = tokenProvider;
        this.authService = authService;
    }

    @GetMapping("/me")
    public UserProfile getProfile(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String userName = tokenProvider.getUserNameFromToken(token);
        return authService.getUserProfile(userName);
    }
}
