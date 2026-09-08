package com.cusoc.accessaudit.service;

import com.cusoc.accessaudit.dto.AuthResponse;
import com.cusoc.accessaudit.dto.LoginRequest;
import com.cusoc.accessaudit.dto.RegisterRequest;
import com.cusoc.accessaudit.entity.Role;
import com.cusoc.accessaudit.entity.User;
import com.cusoc.accessaudit.repository.UserRepository;
import com.cusoc.accessaudit.security.JwtUtils;
import com.cusoc.accessaudit.service.impl.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock private UserRepository userRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private JwtUtils jwtUtils;
    @Mock private AuthenticationManager authenticationManager;
    @Mock private Authentication authentication;

    private AuthServiceImpl authService;

    @BeforeEach
    void setUp() {
        authService = new AuthServiceImpl(
                userRepository,
                passwordEncoder,
                jwtUtils,
                authenticationManager
        );
    }

    @Test
    void registerCreatesEnabledUserWithEncodedPassword() {
        RegisterRequest request = RegisterRequest.builder()
                .fullName("Test Student")
                .email("student@example.com")
                .password("plain-password")
                .role(Role.STUDENT)
                .build();

        when(userRepository.existsByEmail(request.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encoded-password");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            user.setId(10L);
            return user;
        });
        when(jwtUtils.generateJwtToken(request.getEmail())).thenReturn("jwt-token");

        AuthResponse response = authService.register(request);

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());

        User savedUser = userCaptor.getValue();
        assertEquals("encoded-password", savedUser.getPassword());
        assertEquals(Role.STUDENT, savedUser.getRole());
        assertTrue(savedUser.isEnabled());
        assertEquals("jwt-token", response.getToken());
        assertEquals(10L, response.getUserId());
    }

    @Test
    void registerRejectsDuplicateEmail() {
        RegisterRequest request = RegisterRequest.builder()
                .fullName("Existing User")
                .email("existing@example.com")
                .password("password")
                .role(Role.STUDENT)
                .build();

        when(userRepository.existsByEmail(request.getEmail())).thenReturn(true);

        IllegalArgumentException exception =
                assertThrows(IllegalArgumentException.class, () -> authService.register(request));

        assertEquals("Email is already registered!", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
        verify(passwordEncoder, never()).encode(anyString());
    }

    @Test
    void loginAuthenticatesAndReturnsUserDetails() {
        LoginRequest request = LoginRequest.builder()
                .email("admin@example.com")
                .password("password")
                .build();

        User user = User.builder()
                .id(1L)
                .fullName("Test Admin")
                .email(request.getEmail())
                .password("encoded-password")
                .role(Role.ADMIN)
                .enabled(true)
                .build();

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(user);
        when(jwtUtils.generateJwtToken(authentication)).thenReturn("jwt-token");

        AuthResponse response = authService.login(request);

        assertEquals("jwt-token", response.getToken());
        assertEquals(1L, response.getUserId());
        assertEquals("Test Admin", response.getFullName());
        assertEquals(Role.ADMIN, response.getRole());
        verify(authenticationManager).authenticate(
                argThat(token -> request.getEmail().equals(token.getPrincipal())
                        && request.getPassword().equals(token.getCredentials()))
        );
    }
}
