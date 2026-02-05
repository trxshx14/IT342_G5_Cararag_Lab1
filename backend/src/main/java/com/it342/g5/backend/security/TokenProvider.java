package com.it342.g5.backend.security;

import org.springframework.stereotype.Component;

import java.util.Base64;

@Component
public class TokenProvider {

    public String generateToken(String userName) {
        return Base64.getEncoder().encodeToString(userName.getBytes());
    }

    public String getUserNameFromToken(String token) {
        return new String(Base64.getDecoder().decode(token));
    }
}
