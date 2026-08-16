package com.cusoc.accessaudit.service;

import com.cusoc.accessaudit.dto.MaintenanceTaskRequest;
import com.cusoc.accessaudit.dto.MaintenanceTaskResponse;
import com.cusoc.accessaudit.dto.MaintenanceTaskUpdateRequest;

import java.util.List;

/**
 * MaintenanceTaskService Interface
 * 
 * Handles technician remediation schedules:
 * - Allocates task tickets to specific buildings and users.
 * - Handles updates on repair tasks progression.
 */
public interface MaintenanceTaskService {
    MaintenanceTaskResponse createTask(MaintenanceTaskRequest request);
    List<MaintenanceTaskResponse> getTasks(Long buildingId, Long assigneeId, String status);
    List<MaintenanceTaskResponse> getMyTasks(String assigneeEmail);
    MaintenanceTaskResponse getTaskById(Long id, String currentUserEmail);
    MaintenanceTaskResponse updateTask(Long id, MaintenanceTaskUpdateRequest request, String currentUserEmail);
    void deleteTask(Long id);
}
