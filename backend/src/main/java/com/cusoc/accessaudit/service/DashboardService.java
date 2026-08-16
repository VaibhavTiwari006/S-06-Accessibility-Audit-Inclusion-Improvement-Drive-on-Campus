package com.cusoc.accessaudit.service;

import com.cusoc.accessaudit.dto.DashboardStatsResponse;

/**
 * DashboardService Interface
 * 
 * Aggregates site metrics for dashboard cards:
 * - Collects counts of buildings, audits status, and open reports.
 */
public interface DashboardService {
    DashboardStatsResponse getStats();
}
