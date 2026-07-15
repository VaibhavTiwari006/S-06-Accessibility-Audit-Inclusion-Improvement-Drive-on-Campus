package com.cusoc.accessaudit.controller;

import com.cusoc.accessaudit.dto.StudentReportRequest;
import com.cusoc.accessaudit.dto.StudentReportResponse;
import com.cusoc.accessaudit.dto.StudentReportStatusRequest;
import com.cusoc.accessaudit.response.ApiResponse;
import com.cusoc.accessaudit.service.StudentReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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
@RequestMapping("/api/student-reports")
@RequiredArgsConstructor
@Tag(name = "Student Reports", description = "Endpoints for student accessibility barrier reports")
@SecurityRequirement(name = "Bearer Authentication")
public class StudentReportController {

    private final StudentReportService studentReportService;

    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    @Operation(summary = "Submit a student report", description = "Allows students to report accessibility barriers with location and optional photo URL.")
    public ResponseEntity<ApiResponse<StudentReportResponse>> createReport(
            @Valid @RequestBody StudentReportRequest request,
            Authentication authentication) {
        StudentReportResponse response = studentReportService.createReport(request, authentication.getName());
        return new ResponseEntity<>(ApiResponse.<StudentReportResponse>builder()
                .success(true)
                .message("Student report submitted successfully")
                .data(response)
                .build(), HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MAINTENANCE')")
    @Operation(summary = "Get student reports", description = "Retrieves student reports with optional building and status filters.")
    public ResponseEntity<ApiResponse<List<StudentReportResponse>>> getReports(
            @RequestParam(required = false) Long buildingId,
            @RequestParam(required = false) String status) {
        List<StudentReportResponse> reports = studentReportService.getReports(buildingId, status);
        return ResponseEntity.ok(ApiResponse.<List<StudentReportResponse>>builder()
                .success(true)
                .message("Student reports retrieved successfully")
                .data(reports)
                .build());
    }

    @GetMapping("/mine")
    @PreAuthorize("hasRole('STUDENT')")
    @Operation(summary = "Get my reports", description = "Allows students to track the status of their submitted accessibility reports.")
    public ResponseEntity<ApiResponse<List<StudentReportResponse>>> getMyReports(Authentication authentication) {
        List<StudentReportResponse> reports = studentReportService.getMyReports(authentication.getName());
        return ResponseEntity.ok(ApiResponse.<List<StudentReportResponse>>builder()
                .success(true)
                .message("Your reports retrieved successfully")
                .data(reports)
                .build());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get student report by ID", description = "Admins and maintenance can view reports; students can view their own report.")
    public ResponseEntity<ApiResponse<StudentReportResponse>> getReportById(
            @PathVariable Long id,
            Authentication authentication) {
        StudentReportResponse report = studentReportService.getReportById(id, authentication.getName());
        return ResponseEntity.ok(ApiResponse.<StudentReportResponse>builder()
                .success(true)
                .message("Student report retrieved successfully")
                .data(report)
                .build());
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update student report status", description = "Allows admins to review, verify, reject, or resolve a student report.")
    public ResponseEntity<ApiResponse<StudentReportResponse>> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody StudentReportStatusRequest request) {
        StudentReportResponse response = studentReportService.updateStatus(id, request);
        return ResponseEntity.ok(ApiResponse.<StudentReportResponse>builder()
                .success(true)
                .message("Student report status updated successfully")
                .data(response)
                .build());
    }
}
