package com.cusoc.accessaudit.service.impl;

import com.cusoc.accessaudit.dto.DashboardStatsResponse;
import com.cusoc.accessaudit.entity.Audit;
import com.cusoc.accessaudit.entity.MaintenanceTask;
import com.cusoc.accessaudit.entity.StudentReport;
import com.cusoc.accessaudit.repository.AuditRepository;
import com.cusoc.accessaudit.repository.BuildingRepository;
import com.cusoc.accessaudit.repository.EvidenceRepository;
import com.cusoc.accessaudit.repository.MaintenanceTaskRepository;
import com.cusoc.accessaudit.repository.StudentReportRepository;
import com.cusoc.accessaudit.repository.UserRepository;
import com.cusoc.accessaudit.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final BuildingRepository buildingRepository;
    private final AuditRepository auditRepository;
    private final EvidenceRepository evidenceRepository;
    private final StudentReportRepository studentReportRepository;
    private final MaintenanceTaskRepository maintenanceTaskRepository;

    @Override
    @Transactional(readOnly = true)
    public DashboardStatsResponse getStats() {
        List<Audit> audits = auditRepository.findAll();
        List<StudentReport> studentReports = studentReportRepository.findAll();
        List<MaintenanceTask> maintenanceTasks = maintenanceTaskRepository.findAll();

        double averageScore = audits.stream()
                .mapToDouble(Audit::getOverallAccessibilityScore)
                .average()
                .orElse(0.0);

        return DashboardStatsResponse.builder()
                .totalUsers(userRepository.count())
                .totalBuildings(buildingRepository.count())
                .totalAudits(audits.size())
                .totalEvidence(evidenceRepository.count())
                .totalStudentReports(studentReports.size())
                .totalMaintenanceTasks(maintenanceTasks.size())
                .averageAccessibilityScore(averageScore)
                .auditsByStatus(countAuditsByStatus(audits))
                .studentReportsByStatus(countReportsByStatus(studentReports))
                .maintenanceTasksByStatus(countTasksByStatus(maintenanceTasks))
                .build();
    }

    private Map<String, Long> countAuditsByStatus(List<Audit> audits) {
        return audits.stream().collect(Collectors.groupingBy(Audit::getStatus, Collectors.counting()));
    }

    private Map<String, Long> countReportsByStatus(List<StudentReport> reports) {
        return reports.stream().collect(Collectors.groupingBy(StudentReport::getStatus, Collectors.counting()));
    }

    private Map<String, Long> countTasksByStatus(List<MaintenanceTask> tasks) {
        return tasks.stream().collect(Collectors.groupingBy(MaintenanceTask::getStatus, Collectors.counting()));
    }
}
