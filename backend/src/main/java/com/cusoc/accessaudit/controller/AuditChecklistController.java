package com.cusoc.accessaudit.controller;

import com.cusoc.accessaudit.dto.AuditChecklistRequest;
import com.cusoc.accessaudit.dto.AuditChecklistResponse;
import com.cusoc.accessaudit.response.ApiResponse;
import com.cusoc.accessaudit.service.AuditChecklistService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit-checklists")
@RequiredArgsConstructor
@Tag(name = "Audit Checklists", description = "Endpoints for managing accessibility audit checklist questions")
@SecurityRequirement(name = "Bearer Authentication")
public class AuditChecklistController {

    private final AuditChecklistService checklistService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a checklist item", description = "Creates a new accessibility checklist question under a category. Admin access only.")
    public ResponseEntity<ApiResponse<AuditChecklistResponse>> createChecklist(
            @Valid @RequestBody AuditChecklistRequest request) {
        AuditChecklistResponse response = checklistService.createChecklist(request);
        return new ResponseEntity<>(ApiResponse.<AuditChecklistResponse>builder()
                .success(true)
                .message("Checklist item created successfully")
                .data(response)
                .build(), HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get all checklist items", description = "Retrieves all accessibility checklist questions. Optionally filter by category.")
    public ResponseEntity<ApiResponse<List<AuditChecklistResponse>>> getAllChecklists(
            @RequestParam(required = false) Long categoryId) {
        List<AuditChecklistResponse> checklists = (categoryId != null)
                ? checklistService.getChecklistsByCategory(categoryId)
                : checklistService.getAllChecklists();
        return ResponseEntity.ok(ApiResponse.<List<AuditChecklistResponse>>builder()
                .success(true)
                .message("Checklist items retrieved successfully")
                .data(checklists)
                .build());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get checklist item by ID", description = "Retrieves a specific checklist question by its ID.")
    public ResponseEntity<ApiResponse<AuditChecklistResponse>> getChecklistById(@PathVariable Long id) {
        AuditChecklistResponse response = checklistService.getChecklistById(id);
        return ResponseEntity.ok(ApiResponse.<AuditChecklistResponse>builder()
                .success(true)
                .message("Checklist item retrieved successfully")
                .data(response)
                .build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a checklist item", description = "Modifies an existing checklist question. Admin access only.")
    public ResponseEntity<ApiResponse<AuditChecklistResponse>> updateChecklist(
            @PathVariable Long id,
            @Valid @RequestBody AuditChecklistRequest request) {
        AuditChecklistResponse response = checklistService.updateChecklist(id, request);
        return ResponseEntity.ok(ApiResponse.<AuditChecklistResponse>builder()
                .success(true)
                .message("Checklist item updated successfully")
                .data(response)
                .build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a checklist item", description = "Removes a checklist question by ID. Admin access only.")
    public ResponseEntity<ApiResponse<Void>> deleteChecklist(@PathVariable Long id) {
        checklistService.deleteChecklist(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Checklist item deleted successfully")
                .data(null)
                .build());
    }
}
