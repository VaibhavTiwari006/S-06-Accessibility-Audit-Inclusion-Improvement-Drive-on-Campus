package com.cusoc.accessaudit.service.impl;

import com.cusoc.accessaudit.dto.StudentReportRequest;
import com.cusoc.accessaudit.dto.StudentReportResponse;
import com.cusoc.accessaudit.dto.StudentReportStatusRequest;
import com.cusoc.accessaudit.entity.Building;
import com.cusoc.accessaudit.entity.Role;
import com.cusoc.accessaudit.entity.StudentReport;
import com.cusoc.accessaudit.entity.User;
import com.cusoc.accessaudit.exception.ResourceNotFoundException;
import com.cusoc.accessaudit.mapper.StudentReportMapper;
import com.cusoc.accessaudit.repository.BuildingRepository;
import com.cusoc.accessaudit.repository.StudentReportRepository;
import com.cusoc.accessaudit.repository.UserRepository;
import com.cusoc.accessaudit.service.StudentReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentReportServiceImpl implements StudentReportService {

    private final StudentReportRepository studentReportRepository;
    private final BuildingRepository buildingRepository;
    private final UserRepository userRepository;
    private final StudentReportMapper studentReportMapper;

    @Override
    @Transactional
    public StudentReportResponse createReport(StudentReportRequest request, String reporterEmail) {
        User reporter = getUserByEmail(reporterEmail);
        Building building = request.getBuildingId() == null ? null : buildingRepository.findById(request.getBuildingId())
                .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + request.getBuildingId()));

        StudentReport report = StudentReport.builder()
                .building(building)
                .reporter(reporter)
                .description(request.getDescription())
                .locationDetails(request.getLocationDetails())
                .photoUrl(request.getPhotoUrl())
                .status("SUBMITTED")
                .build();

        return studentReportMapper.toResponse(studentReportRepository.save(report));
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentReportResponse> getReports(Long buildingId, String status) {
        return studentReportRepository.findAll().stream()
                .filter(report -> buildingId == null
                        || (report.getBuilding() != null && Objects.equals(report.getBuilding().getId(), buildingId)))
                .filter(report -> status == null || report.getStatus().equalsIgnoreCase(status))
                .map(studentReportMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentReportResponse> getMyReports(String reporterEmail) {
        User reporter = getUserByEmail(reporterEmail);
        return studentReportRepository.findByReporterId(reporter.getId()).stream()
                .map(studentReportMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public StudentReportResponse getReportById(Long id, String currentUserEmail) {
        StudentReport report = getReport(id);
        User currentUser = getUserByEmail(currentUserEmail);

        boolean canView = currentUser.getRole() == Role.ADMIN
                || currentUser.getRole() == Role.MAINTENANCE
                || Objects.equals(report.getReporter().getId(), currentUser.getId());
        if (!canView) {
            throw new AccessDeniedException("You do not have permission to view this report");
        }

        return studentReportMapper.toResponse(report);
    }

    @Override
    @Transactional
    public StudentReportResponse updateStatus(Long id, StudentReportStatusRequest request) {
        StudentReport report = getReport(id);
        report.setStatus(request.getStatus());
        report.setAdminNotes(request.getAdminNotes());
        report.setUpdatedAt(LocalDateTime.now());
        return studentReportMapper.toResponse(studentReportRepository.save(report));
    }

    private StudentReport getReport(Long id) {
        return studentReportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student report not found with id: " + id));
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Logged in user not found"));
    }
}
