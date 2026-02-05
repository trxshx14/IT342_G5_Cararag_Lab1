package com.it342.g5.backend.service;

import com.it342.g5.backend.dto.*;
import com.it342.g5.backend.model.User;
import com.it342.g5.backend.repository.UserRepository;
import com.it342.g5.backend.security.TokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public AuthService(UserRepository userRepository,
                    PasswordEncoder passwordEncoder,
                    TokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    public AuthResponse registerUser(RegisterDTO dto) {
        if (userRepository.existsByUserName(dto.userName) ||
            userRepository.existsByEmail(dto.email)) {
            throw new RuntimeException("User already exists");
        }

        User user = new User();
        user.setUserName(dto.userName);
        user.setEmail(dto.email);
        user.setFirstName(dto.firstName);
        user.setLastName(dto.lastName);
        user.setPasswordHash(passwordEncoder.encode(dto.password));

        userRepository.save(user);

        AuthResponse response = new AuthResponse();
        response.message = "Registration successful";
        response.userName = user.getUserName();
        return response;
    }

    public AuthResponse loginUser(LoginDTO dto) {
        User user = userRepository.findByUserName(dto.userName)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(dto.password, user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        AuthResponse response = new AuthResponse();
        response.token = tokenProvider.generateToken(user.getUserName());
        response.userName = user.getUserName();
        response.message = "Login successful";
        return response;
    }

    public UserProfile getUserProfile(String userName) {
        User user = userRepository.findByUserName(userName)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserProfile profile = new UserProfile();
        profile.userId = user.getUserId();
        profile.userName = user.getUserName();
        profile.firstName = user.getFirstName();
        profile.lastName = user.getLastName();
        profile.email = user.getEmail();
        profile.createdAt = user.getCreatedAt();

        return profile;
    }
}
