package com.cusoc.accessaudit.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {
    private long totalUsers;
    private long totalBuildings;
    private long totalAudits;
    private long totalEvidence;
    private long totalStudentReports;
    private long totalMaintenanceTasks;
    private double averageAccessibilityScore;
    private Map<String, Long> auditsByStatus;
    private Map<String, Long> studentReportsByStatus;
    private Map<String, Long> maintenanceTasksByStatus;
}
