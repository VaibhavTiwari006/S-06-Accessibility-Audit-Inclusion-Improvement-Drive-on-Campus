package com.cusoc.accessaudit.controller;

import com.cusoc.accessaudit.dto.AuditRequest;
import com.cusoc.accessaudit.dto.AuditResponseDto;
import com.cusoc.accessaudit.dto.AuditReviewRequest;
import com.cusoc.accessaudit.response.ApiResponse;
import com.cusoc.accessaudit.service.AuditService;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/audits")
@RequiredArgsConstructor
@Tag(name = "Audits", description = "Endpoints for assigning, drafting, submitting, and reviewing accessibility audits")
@SecurityRequirement(name = "Bearer Authentication")
public class AuditController {

    private final AuditService auditService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','AUDITOR')")
    @Operation(summary = "Create a draft audit", description = "Assigns an audit to an auditor and optionally stores draft checklist responses.")
    public ResponseEntity<ApiResponse<AuditResponseDto>> createDraft(
            @Valid @RequestBody AuditRequest request,
            Authentication authentication) {
        AuditResponseDto response = auditService.createDraft(request, authentication.getName());
        return new ResponseEntity<>(ApiResponse.<AuditResponseDto>builder()
                .success(true)
                .message("Audit draft created successfully")
                .data(response)
                .build(), HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get audits", description = "Retrieves audits with optional building, auditor, or status filters.")
    public ResponseEntity<ApiResponse<List<AuditResponseDto>>> getAudits(
            @RequestParam(required = false) Long buildingId,
            @RequestParam(required = false) Long auditorId,
            @RequestParam(required = false) String status) {
        List<AuditResponseDto> audits = auditService.getAllAudits(buildingId, auditorId, status);
        return ResponseEntity.ok(ApiResponse.<List<AuditResponseDto>>builder()
                .success(true)
                .message("Audits retrieved successfully")
                .data(audits)
                .build());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get audit by ID", description = "Retrieves an audit and its checklist responses.")
    public ResponseEntity<ApiResponse<AuditResponseDto>> getAuditById(@PathVariable Long id) {
        AuditResponseDto audit = auditService.getAuditById(id);
        return ResponseEntity.ok(ApiResponse.<AuditResponseDto>builder()
                .success(true)
                .message("Audit retrieved successfully")
                .data(audit)
                .build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','AUDITOR')")
    @Operation(summary = "Update a draft audit", description = "Updates draft audit details and replaces draft checklist responses.")
    public ResponseEntity<ApiResponse<AuditResponseDto>> updateDraft(
            @PathVariable Long id,
            @Valid @RequestBody AuditRequest request,
            Authentication authentication) {
        AuditResponseDto response = auditService.updateDraft(id, request, authentication.getName());
        return ResponseEntity.ok(ApiResponse.<AuditResponseDto>builder()
                .success(true)
                .message("Audit draft updated successfully")
                .data(response)
                .build());
    }

    @PostMapping("/{id}/submit")
    @PreAuthorize("hasAnyRole('ADMIN','AUDITOR')")
    @Operation(summary = "Submit an audit", description = "Submits a draft audit and recalculates the accessibility score.")
    public ResponseEntity<ApiResponse<AuditResponseDto>> submitAudit(
            @PathVariable Long id,
            Authentication authentication) {
        AuditResponseDto response = auditService.submitAudit(id, authentication.getName());
        return ResponseEntity.ok(ApiResponse.<AuditResponseDto>builder()
                .success(true)
                .message("Audit submitted successfully")
                .data(response)
                .build());
    }

    @PostMapping("/{id}/review")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Review an audit", description = "Approves or rejects a submitted audit. Admin access only.")
    public ResponseEntity<ApiResponse<AuditResponseDto>> reviewAudit(
            @PathVariable Long id,
            @Valid @RequestBody AuditReviewRequest request) {
        AuditResponseDto response = auditService.reviewAudit(id, request);
        return ResponseEntity.ok(ApiResponse.<AuditResponseDto>builder()
                .success(true)
                .message("Audit reviewed successfully")
                .data(response)
                .build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete audit", description = "Deletes an audit and its checklist responses. Admin access only.")
    public ResponseEntity<ApiResponse<Void>> deleteAudit(@PathVariable Long id) {
        auditService.deleteAudit(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Audit deleted successfully")
                .data(null)
                .build());
    }
}
