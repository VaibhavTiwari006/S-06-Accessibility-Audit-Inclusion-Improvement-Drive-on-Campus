package com.cusoc.accessaudit.service.impl;

import com.cusoc.accessaudit.dto.MaintenanceTaskRequest;
import com.cusoc.accessaudit.dto.MaintenanceTaskResponse;
import com.cusoc.accessaudit.dto.MaintenanceTaskUpdateRequest;
import com.cusoc.accessaudit.entity.Audit;
import com.cusoc.accessaudit.entity.Building;
import com.cusoc.accessaudit.entity.MaintenanceTask;
import com.cusoc.accessaudit.entity.Role;
import com.cusoc.accessaudit.entity.StudentReport;
import com.cusoc.accessaudit.entity.User;
import com.cusoc.accessaudit.exception.ResourceNotFoundException;
import com.cusoc.accessaudit.mapper.MaintenanceTaskMapper;
import com.cusoc.accessaudit.repository.AuditRepository;
import com.cusoc.accessaudit.repository.BuildingRepository;
import com.cusoc.accessaudit.repository.MaintenanceTaskRepository;
import com.cusoc.accessaudit.repository.StudentReportRepository;
import com.cusoc.accessaudit.repository.UserRepository;
import com.cusoc.accessaudit.service.MaintenanceTaskService;
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
public class MaintenanceTaskServiceImpl implements MaintenanceTaskService {

    private final MaintenanceTaskRepository maintenanceTaskRepository;
    private final BuildingRepository buildingRepository;
    private final UserRepository userRepository;
    private final AuditRepository auditRepository;
    private final StudentReportRepository studentReportRepository;
    private final MaintenanceTaskMapper maintenanceTaskMapper;

    @Override
    @Transactional
    public MaintenanceTaskResponse createTask(MaintenanceTaskRequest request) {
        Building building = resolveBuilding(request.getBuildingId());
        User assignee = resolveAssignee(request.getAssigneeId());
        Audit sourceAudit = resolveAudit(request.getSourceAuditId());
        StudentReport sourceReport = resolveReport(request.getSourceReportId());

        if (building == null) {
            building = sourceAudit != null ? sourceAudit.getBuilding() : null;
        }
        if (building == null && sourceReport != null) {
            building = sourceReport.getBuilding();
        }

        MaintenanceTask task = MaintenanceTask.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .building(building)
                .assignee(assignee)
                .sourceAudit(sourceAudit)
                .sourceReport(sourceReport)
                .severity(request.getSeverity() != null ? request.getSeverity() : "MEDIUM")
                .priority(request.getPriority() != null ? request.getPriority() : "MEDIUM")
                .dueDate(request.getDueDate())
                .status("OPEN")
                .build();

        return maintenanceTaskMapper.toResponse(maintenanceTaskRepository.save(task));
    }

    @Override
    @Transactional(readOnly = true)
    public List<MaintenanceTaskResponse> getTasks(Long buildingId, Long assigneeId, String status) {
        return maintenanceTaskRepository.findAll().stream()
                .filter(task -> buildingId == null
                        || (task.getBuilding() != null && Objects.equals(task.getBuilding().getId(), buildingId)))
                .filter(task -> assigneeId == null
                        || (task.getAssignee() != null && Objects.equals(task.getAssignee().getId(), assigneeId)))
                .filter(task -> status == null || task.getStatus().equalsIgnoreCase(status))
                .map(maintenanceTaskMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MaintenanceTaskResponse> getMyTasks(String assigneeEmail) {
        User assignee = getUserByEmail(assigneeEmail);
        return maintenanceTaskRepository.findByAssigneeId(assignee.getId()).stream()
                .map(maintenanceTaskMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public MaintenanceTaskResponse getTaskById(Long id, String currentUserEmail) {
        MaintenanceTask task = getTask(id);
        User currentUser = getUserByEmail(currentUserEmail);
        requireAdminOrAssignee(currentUser, task);
        return maintenanceTaskMapper.toResponse(task);
    }

    @Override
    @Transactional
    public MaintenanceTaskResponse updateTask(Long id, MaintenanceTaskUpdateRequest request, String currentUserEmail) {
        MaintenanceTask task = getTask(id);
        User currentUser = getUserByEmail(currentUserEmail);
        requireAdminOrAssignee(currentUser, task);

        boolean isAdmin = currentUser.getRole() == Role.ADMIN;
        if (request.getStatus() != null) {
            task.setStatus(request.getStatus());
        }
        if (request.getCompletionNotes() != null) {
            task.setCompletionNotes(request.getCompletionNotes());
        }
        if (request.getCompletionPhotoUrl() != null) {
            task.setCompletionPhotoUrl(request.getCompletionPhotoUrl());
        }

        if (isAdmin) {
            if (request.getSeverity() != null) {
                task.setSeverity(request.getSeverity());
            }
            if (request.getPriority() != null) {
                task.setPriority(request.getPriority());
            }
            if (request.getDueDate() != null) {
                task.setDueDate(request.getDueDate());
            }
            if (request.getAssigneeId() != null) {
                task.setAssignee(resolveAssignee(request.getAssigneeId()));
            }
        }

        task.setUpdatedAt(LocalDateTime.now());
        return maintenanceTaskMapper.toResponse(maintenanceTaskRepository.save(task));
    }

    @Override
    @Transactional
    public void deleteTask(Long id) {
        maintenanceTaskRepository.delete(getTask(id));
    }

    private MaintenanceTask getTask(Long id) {
        return maintenanceTaskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance task not found with id: " + id));
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Logged in user not found"));
    }

    private Building resolveBuilding(Long buildingId) {
        if (buildingId == null) {
            return null;
        }
        return buildingRepository.findById(buildingId)
                .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + buildingId));
    }

    private User resolveAssignee(Long assigneeId) {
        if (assigneeId == null) {
            return null;
        }
        User assignee = userRepository.findById(assigneeId)
                .orElseThrow(() -> new ResourceNotFoundException("Assignee not found with id: " + assigneeId));
        if (assignee.getRole() != Role.MAINTENANCE && assignee.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("Assignee must have MAINTENANCE or ADMIN role");
        }
        return assignee;
    }

    private Audit resolveAudit(Long auditId) {
        if (auditId == null) {
            return null;
        }
        Audit audit = auditRepository.findById(auditId)
                .orElseThrow(() -> new ResourceNotFoundException("Audit not found with id: " + auditId));
        if (!"APPROVED".equals(audit.getStatus())) {
            throw new IllegalArgumentException("Maintenance tasks can only be linked to approved audits");
        }
        return audit;
    }

    private StudentReport resolveReport(Long reportId) {
        if (reportId == null) {
            return null;
        }
        StudentReport report = studentReportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Student report not found with id: " + reportId));
        if (!"VERIFIED".equals(report.getStatus()) && !"RESOLVED".equals(report.getStatus())) {
            throw new IllegalArgumentException("Maintenance tasks can only be linked to verified or resolved student reports");
        }
        return report;
    }

    private void requireAdminOrAssignee(User currentUser, MaintenanceTask task) {
        boolean isAdmin = currentUser.getRole() == Role.ADMIN;
        boolean isAssignee = task.getAssignee() != null && Objects.equals(task.getAssignee().getId(), currentUser.getId());
        if (!isAdmin && !isAssignee) {
            throw new AccessDeniedException("You do not have permission to manage this maintenance task");
        }
    }
}
