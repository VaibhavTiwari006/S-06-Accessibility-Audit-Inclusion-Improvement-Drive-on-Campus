package com.cusoc.accessaudit.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Enterprise Rate-Limiting & DoS Shield Filter
 * 
 * Inspects incoming requests and limits burst rates to sensitive API endpoints.
 * Throttles brute-force attempts and returns standardized HTTP 429 responses.
 */
@Component
@RequiredArgsConstructor
public class RateLimitingFilter extends OncePerRequestFilter {

    private final BruteForceProtectionService bruteForceService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // In-memory sliding window IP request counter
    private final Map<String, RequestBucket> ipBuckets = new ConcurrentHashMap<>();

    private static final int MAX_AUTH_REQUESTS_PER_MINUTE = 20;
    private static final long ONE_MINUTE_MS = 60_000L;

    private static class RequestBucket {
        AtomicInteger count = new AtomicInteger(0);
        long windowStart = System.currentTimeMillis();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String clientIp = getClientIp(request);
        String requestUri = request.getRequestURI();

        // Check if IP is blocked due to consecutive failed authentications
        if (bruteForceService.isBlocked(clientIp)) {
            long remainingSec = bruteForceService.getRemainingLockoutSeconds(clientIp);
            sendTooManyRequestsResponse(response, 
                "IP temporarily locked due to excessive failed attempts. Please retry in " + remainingSec + " seconds.");
            return;
        }

        // Apply rate limits specifically to authentication endpoints
        if (requestUri.startsWith("/api/auth/")) {
            long now = System.currentTimeMillis();
            RequestBucket bucket = ipBuckets.compute(clientIp, (ip, b) -> {
                if (b == null || (now - b.windowStart > ONE_MINUTE_MS)) {
                    RequestBucket newBucket = new RequestBucket();
                    newBucket.count.set(1);
                    newBucket.windowStart = now;
                    return newBucket;
                }
                b.count.incrementAndGet();
                return b;
            });

            if (bucket.count.get() > MAX_AUTH_REQUESTS_PER_MINUTE) {
                sendTooManyRequestsResponse(response, 
                    "Rate limit exceeded on authentication endpoints. Please wait before retrying.");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private void sendTooManyRequestsResponse(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setHeader("Retry-After", "60");

        Map<String, Object> errorDetails = new HashMap<>();
        errorDetails.put("status", HttpStatus.TOO_MANY_REQUESTS.value());
        errorDetails.put("error", "Too Many Requests");
        errorDetails.put("message", message);
        errorDetails.put("timestamp", System.currentTimeMillis());

        response.getWriter().write(objectMapper.writeValueAsString(errorDetails));
    }

    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isEmpty() || "unknown".equalsIgnoreCase(xfHeader)) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0].trim();
    }
}
