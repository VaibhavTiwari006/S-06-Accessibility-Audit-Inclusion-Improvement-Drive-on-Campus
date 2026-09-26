package com.cusoc.accessaudit.service.impl;

import com.cusoc.accessaudit.dto.AuthResponse;
import com.cusoc.accessaudit.dto.LoginRequest;
import com.cusoc.accessaudit.dto.RegisterRequest;
import com.cusoc.accessaudit.entity.User;
import com.cusoc.accessaudit.entity.Role;
import com.cusoc.accessaudit.repository.UserRepository;
import com.cusoc.accessaudit.security.JwtUtils;
import com.cusoc.accessaudit.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final com.cusoc.accessaudit.security.BruteForceProtectionService bruteForceService;

    private void validatePasswordStrength(String password) {
        if (password == null || password.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters long.");
        }
        boolean hasUpper = false;
        boolean hasLower = false;
        boolean hasDigit = false;
        for (char c : password.toCharArray()) {
            if (Character.isUpperCase(c)) hasUpper = true;
            if (Character.isLowerCase(c)) hasLower = true;
            if (Character.isDigit(c)) hasDigit = true;
        }
        if (!hasUpper || !hasLower || !hasDigit) {
            throw new IllegalArgumentException("Password must contain at least one uppercase letter, one lowercase letter, and one number.");
        }
    }

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered!");
        }

        validatePasswordStrength(request.getPassword());

        // Public registration always assigns STUDENT role to prevent privilege escalation
        Role assignedRole = Role.STUDENT;

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(assignedRole)
                .enabled(true)
                .build();

        User savedUser = userRepository.save(user);

        // Generate token for auto-login after register
        String token = jwtUtils.generateJwtToken(savedUser.getEmail());

        return AuthResponse.builder()
                .token(token)
                .userId(savedUser.getId())
                .fullName(savedUser.getFullName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String email = request.getEmail();
        if (bruteForceService.isBlocked(email)) {
            long remainingSec = bruteForceService.getRemainingLockoutSeconds(email);
            throw new IllegalArgumentException("Account is temporarily locked due to excessive failed attempts. Please retry in " + remainingSec + " seconds.");
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, request.getPassword())
            );

            // Reset failed counter upon successful login
            bruteForceService.loginSucceeded(email);

            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = (User) authentication.getPrincipal();
            String token = jwtUtils.generateJwtToken(authentication);

            return AuthResponse.builder()
                    .token(token)
                    .userId(user.getId())
                    .fullName(user.getFullName())
                    .email(user.getEmail())
                    .role(user.getRole())
                    .build();
        } catch (org.springframework.security.core.AuthenticationException ex) {
            bruteForceService.loginFailed(email);
            throw ex;
        }
    }
}
