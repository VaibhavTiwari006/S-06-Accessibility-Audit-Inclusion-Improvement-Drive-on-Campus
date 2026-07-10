package com.cusoc.accessaudit.service;

import com.cusoc.accessaudit.dto.AuthResponse;
import com.cusoc.accessaudit.dto.LoginRequest;
import com.cusoc.accessaudit.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
