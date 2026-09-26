package com.cusoc.accessaudit.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

/**
 * Enterprise Brute-Force & Credential Stuffing Defense Service
 * 
 * Tracks failed authentication attempts across IP addresses and user accounts.
 * Enforces temporary lockouts when consecutive failures exceed the statutory threshold.
 */
@Service
public class BruteForceProtectionService {

    private static final Logger logger = LoggerFactory.getLogger(BruteForceProtectionService.class);

    private static final int MAX_ATTEMPTS = 5;
    private static final long LOCKOUT_DURATION_MS = TimeUnit.MINUTES.toMillis(15);

    // Key -> Failed Attempt Tracker
    private final Map<String, AttemptInfo> attemptsCache = new ConcurrentHashMap<>();

    private static class AttemptInfo {
        int attempts;
        long lastAttemptTime;
        long lockedUntil;

        AttemptInfo(int attempts, long lastAttemptTime) {
            this.attempts = attempts;
            this.lastAttemptTime = lastAttemptTime;
            this.lockedUntil = 0;
        }
    }

    /**
     * Records a failed authentication attempt for a given key (IP or username).
     */
    public void loginFailed(String key) {
        long now = System.currentTimeMillis();
        attemptsCache.compute(key, (k, info) -> {
            if (info == null || (now - info.lastAttemptTime > LOCKOUT_DURATION_MS)) {
                return new AttemptInfo(1, now);
            }

            info.attempts++;
            info.lastAttemptTime = now;

            if (info.attempts >= MAX_ATTEMPTS) {
                info.lockedUntil = now + LOCKOUT_DURATION_MS;
                logger.warn("SECURITY ALERT: Key '{}' exceeded max login attempts ({}). Locked out until {}",
                        k, info.attempts, info.lockedUntil);
            }
            return info;
        });
    }

    /**
     * Clears failed attempts upon a successful login.
     */
    public void loginSucceeded(String key) {
        attemptsCache.remove(key);
    }

    /**
     * Checks if a given key is currently locked out.
     */
    public boolean isBlocked(String key) {
        AttemptInfo info = attemptsCache.get(key);
        if (info == null) {
            return false;
        }

        long now = System.currentTimeMillis();
        if (info.lockedUntil > 0 && now < info.lockedUntil) {
            return true;
        }

        // Lockout expired, clean up
        if (info.lockedUntil > 0 && now >= info.lockedUntil) {
            attemptsCache.remove(key);
            return false;
        }

        return false;
    }

    /**
     * Returns remaining lockout seconds if blocked, or 0.
     */
    public long getRemainingLockoutSeconds(String key) {
        AttemptInfo info = attemptsCache.get(key);
        if (info == null || info.lockedUntil == 0) {
            return 0;
        }
        long diff = info.lockedUntil - System.currentTimeMillis();
        return diff > 0 ? (diff / 1000) : 0;
    }
}
