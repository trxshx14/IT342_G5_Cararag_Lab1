package com.it342.g5.backend.security;

import org.springframework.stereotype.Component;

import java.util.Base64;

@Component
public class TokenProvider {

    public String generateToken(String userName) {
        
        return Base64.getUrlEncoder().withoutPadding().encodeToString(userName.getBytes());
    }

    public String getUserNameFromToken(String token) {
        try {
            return new String(Base64.getUrlDecoder().decode(token.trim()));
        } catch (Exception e) {
            System.out.println("Token Decoding Failed: " + e.getMessage());
            return null;
        }
    }
}
