package com.cusoc.accessaudit.controller;

import com.cusoc.accessaudit.dto.MaintenanceTaskRequest;
import com.cusoc.accessaudit.dto.MaintenanceTaskResponse;
import com.cusoc.accessaudit.dto.MaintenanceTaskUpdateRequest;
import com.cusoc.accessaudit.response.ApiResponse;
import com.cusoc.accessaudit.service.MaintenanceTaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance-tasks")
@RequiredArgsConstructor
@Tag(name = "Maintenance Tasks", description = "Endpoints for remediation task assignment and status tracking")
@SecurityRequirement(name = "Bearer Authentication")
public class MaintenanceTaskController {

    private final MaintenanceTaskService maintenanceTaskService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create maintenance task", description = "Creates a remediation task from an approved audit, verified report, or manual admin entry.")
    public ResponseEntity<ApiResponse<MaintenanceTaskResponse>> createTask(
            @Valid @RequestBody MaintenanceTaskRequest request) {
        MaintenanceTaskResponse response = maintenanceTaskService.createTask(request);
        return new ResponseEntity<>(ApiResponse.<MaintenanceTaskResponse>builder()
                .success(true)
                .message("Maintenance task created successfully")
                .data(response)
                .build(), HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get maintenance tasks", description = "Retrieves maintenance tasks with optional building, assignee, and status filters.")
    public ResponseEntity<ApiResponse<List<MaintenanceTaskResponse>>> getTasks(
            @RequestParam(required = false) Long buildingId,
            @RequestParam(required = false) Long assigneeId,
            @RequestParam(required = false) String status) {
        List<MaintenanceTaskResponse> tasks = maintenanceTaskService.getTasks(buildingId, assigneeId, status);
        return ResponseEntity.ok(ApiResponse.<List<MaintenanceTaskResponse>>builder()
                .success(true)
                .message("Maintenance tasks retrieved successfully")
                .data(tasks)
                .build());
    }

    @GetMapping("/mine")
    @PreAuthorize("hasRole('MAINTENANCE')")
    @Operation(summary = "Get my maintenance tasks", description = "Allows maintenance personnel to view their assigned remediation tasks.")
    public ResponseEntity<ApiResponse<List<MaintenanceTaskResponse>>> getMyTasks(Authentication authentication) {
        List<MaintenanceTaskResponse> tasks = maintenanceTaskService.getMyTasks(authentication.getName());
        return ResponseEntity.ok(ApiResponse.<List<MaintenanceTaskResponse>>builder()
                .success(true)
                .message("Your maintenance tasks retrieved successfully")
                .data(tasks)
                .build());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MAINTENANCE')")
    @Operation(summary = "Get maintenance task by ID", description = "Retrieves a maintenance task for admins or the assigned maintenance user.")
    public ResponseEntity<ApiResponse<MaintenanceTaskResponse>> getTaskById(
            @PathVariable Long id,
            Authentication authentication) {
        MaintenanceTaskResponse response = maintenanceTaskService.getTaskById(id, authentication.getName());
        return ResponseEntity.ok(ApiResponse.<MaintenanceTaskResponse>builder()
                .success(true)
                .message("Maintenance task retrieved successfully")
                .data(response)
                .build());
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MAINTENANCE')")
    @Operation(summary = "Update maintenance task", description = "Admins can assign severity and priority; maintenance users can update status and completion details.")
    public ResponseEntity<ApiResponse<MaintenanceTaskResponse>> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody MaintenanceTaskUpdateRequest request,
            Authentication authentication) {
        MaintenanceTaskResponse response = maintenanceTaskService.updateTask(id, request, authentication.getName());
        return ResponseEntity.ok(ApiResponse.<MaintenanceTaskResponse>builder()
                .success(true)
                .message("Maintenance task updated successfully")
                .data(response)
                .build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete maintenance task", description = "Deletes a remediation task. Admin access only.")
    public ResponseEntity<ApiResponse<Void>> deleteTask(@PathVariable Long id) {
        maintenanceTaskService.deleteTask(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Maintenance task deleted successfully")
                .data(null)
                .build());
    }
}
