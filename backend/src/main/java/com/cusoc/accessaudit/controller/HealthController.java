package com.cusoc.accessaudit.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

/**
 * HealthController REST Controller
 * 
 * Provides an unauthenticated liveness and readiness probe endpoint
 * for Docker health checks, reverse proxy load balancers, and monitoring.
 */
@RestController
@RequestMapping("/api/health")
@Tag(name = "Health Check", description = "Endpoint for service uptime and readiness probes")
public class HealthController {

    @GetMapping
    @Operation(summary = "Service Health Probe", description = "Returns service health status and timestamp")
    public ResponseEntity<Map<String, Object>> checkHealth() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("service", "AccessAudit REST API");
        health.put("version", "1.0.0");
        health.put("timestamp", Instant.now().toString());
        return ResponseEntity.ok(health);
    }
}
