package com.cusoc.accessaudit.controller;

import com.cusoc.accessaudit.dto.AuditCategoryRequest;
import com.cusoc.accessaudit.dto.AuditCategoryResponse;
import com.cusoc.accessaudit.response.ApiResponse;
import com.cusoc.accessaudit.service.AuditCategoryService;
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
@RequestMapping("/api/audit-categories")
@RequiredArgsConstructor
@Tag(name = "Audit Categories", description = "Endpoints for managing accessibility audit categories")
@SecurityRequirement(name = "Bearer Authentication")
public class AuditCategoryController {

    private final AuditCategoryService categoryService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create an audit category", description = "Creates a new accessibility audit category. Admin access only.")
    public ResponseEntity<ApiResponse<AuditCategoryResponse>> createCategory(
            @Valid @RequestBody AuditCategoryRequest request) {
        AuditCategoryResponse response = categoryService.createCategory(request);
        return new ResponseEntity<>(ApiResponse.<AuditCategoryResponse>builder()
                .success(true)
                .message("Audit category created successfully")
                .data(response)
                .build(), HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get all audit categories", description = "Retrieves all accessibility audit categories. Available to all authenticated users.")
    public ResponseEntity<ApiResponse<List<AuditCategoryResponse>>> getAllCategories() {
        List<AuditCategoryResponse> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(ApiResponse.<List<AuditCategoryResponse>>builder()
                .success(true)
                .message("Audit categories retrieved successfully")
                .data(categories)
                .build());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get audit category by ID", description = "Retrieves a specific audit category by its ID.")
    public ResponseEntity<ApiResponse<AuditCategoryResponse>> getCategoryById(@PathVariable Long id) {
        AuditCategoryResponse category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(ApiResponse.<AuditCategoryResponse>builder()
                .success(true)
                .message("Audit category retrieved successfully")
                .data(category)
                .build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an audit category", description = "Updates an existing audit category name. Admin access only.")
    public ResponseEntity<ApiResponse<AuditCategoryResponse>> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody AuditCategoryRequest request) {
        AuditCategoryResponse response = categoryService.updateCategory(id, request);
        return ResponseEntity.ok(ApiResponse.<AuditCategoryResponse>builder()
                .success(true)
                .message("Audit category updated successfully")
                .data(response)
                .build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete an audit category", description = "Removes an audit category by ID. Admin access only.")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Audit category deleted successfully")
                .data(null)
                .build());
    }
}
