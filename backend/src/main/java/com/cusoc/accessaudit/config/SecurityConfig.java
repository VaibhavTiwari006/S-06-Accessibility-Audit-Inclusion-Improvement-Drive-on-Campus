package com.cusoc.accessaudit.config;

import com.cusoc.accessaudit.security.JwtAccessDeniedHandler;
import com.cusoc.accessaudit.security.JwtAuthenticationEntryPoint;
import com.cusoc.accessaudit.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsService userDetailsService;
    private final JwtAuthenticationEntryPoint unauthorizedHandler;
    private final JwtAccessDeniedHandler forbiddenHandler;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final com.cusoc.accessaudit.security.RateLimitingFilter rateLimitingFilter;
    private final com.cusoc.accessaudit.security.XssSanitizationFilter xssSanitizationFilter;
    private final CorsConfigurationSource corsConfigurationSource;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            .csrf(AbstractHttpConfigurer::disable)
            .headers(headers -> headers
                .frameOptions(frame -> frame.deny())
                .contentTypeOptions(content -> {})
                .xssProtection(xss -> xss.headerValue(org.springframework.security.web.header.writers.XXssProtectionHeaderWriter.HeaderValue.ENABLED_MODE_BLOCK))
                .contentSecurityPolicy(csp -> csp.policyDirectives(
                    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' http://localhost:8080 http://localhost:5173 http://localhost:3000; frame-ancestors 'none';"
                ))
                .httpStrictTransportSecurity(hsts -> hsts.includeSubDomains(true).maxAgeInSeconds(31536000).preload(true))
                .referrerPolicy(referrer -> referrer.policy(org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN))
                .permissionsPolicy(permissions -> permissions.policy("camera=(self), microphone=(), geolocation=(self), payment=()"))
            )
            .exceptionHandling(exception -> exception
                .authenticationEntryPoint(unauthorizedHandler)
                .accessDeniedHandler(forbiddenHandler)
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/health").permitAll()
                .requestMatchers("/api-docs/**", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                .anyRequest().authenticated()
            );

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(xssSanitizationFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(rateLimitingFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
