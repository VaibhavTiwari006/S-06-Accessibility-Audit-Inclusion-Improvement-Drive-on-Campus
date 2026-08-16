package com.cusoc.accessaudit.service;

import com.cusoc.accessaudit.dto.AuthResponse;
import com.cusoc.accessaudit.dto.LoginRequest;
import com.cusoc.accessaudit.dto.RegisterRequest;

/**
 * AuthService Interface
 * 
 * Handles user credentials validations, registrations, and logins:
 * - Generates JWT authentication tokens.
 * - Password verification using encryption.
 */
public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
