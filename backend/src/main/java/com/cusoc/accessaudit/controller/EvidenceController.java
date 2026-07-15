package com.cusoc.accessaudit.controller;

import com.cusoc.accessaudit.dto.EvidenceResponse;
import com.cusoc.accessaudit.response.ApiResponse;
import com.cusoc.accessaudit.service.EvidenceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/evidence")
@RequiredArgsConstructor
@Tag(name = "Evidence", description = "Endpoints for audit photo evidence upload and retrieval")
@SecurityRequirement(name = "Bearer Authentication")
public class EvidenceController {

    private final EvidenceService evidenceService;

    @PostMapping(value = "/audits/{auditId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('ADMIN','AUDITOR')")
    @Operation(summary = "Upload audit evidence", description = "Uploads an image file as photo evidence for an audit.")
    public ResponseEntity<ApiResponse<EvidenceResponse>> uploadAuditEvidence(
            @PathVariable Long auditId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) String description,
            Authentication authentication) {
        EvidenceResponse response = evidenceService.uploadAuditEvidence(auditId, file, description, authentication.getName());
        return ResponseEntity.ok(ApiResponse.<EvidenceResponse>builder()
                .success(true)
                .message("Evidence uploaded successfully")
                .data(response)
                .build());
    }

    @GetMapping("/audits/{auditId}")
    @Operation(summary = "Get evidence by audit", description = "Retrieves all evidence metadata for a specific audit.")
    public ResponseEntity<ApiResponse<List<EvidenceResponse>>> getEvidenceByAudit(@PathVariable Long auditId) {
        List<EvidenceResponse> evidence = evidenceService.getEvidenceByAudit(auditId);
        return ResponseEntity.ok(ApiResponse.<List<EvidenceResponse>>builder()
                .success(true)
                .message("Evidence retrieved successfully")
                .data(evidence)
                .build());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get evidence metadata", description = "Retrieves evidence metadata by ID.")
    public ResponseEntity<ApiResponse<EvidenceResponse>> getEvidenceById(@PathVariable Long id) {
        EvidenceResponse evidence = evidenceService.getEvidenceById(id);
        return ResponseEntity.ok(ApiResponse.<EvidenceResponse>builder()
                .success(true)
                .message("Evidence retrieved successfully")
                .data(evidence)
                .build());
    }

    @GetMapping("/{id}/file")
    @Operation(summary = "Download evidence file", description = "Streams an uploaded evidence image file.")
    public ResponseEntity<Resource> downloadEvidenceFile(@PathVariable Long id) {
        Resource resource = evidenceService.loadEvidenceFile(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','AUDITOR')")
    @Operation(summary = "Delete evidence", description = "Deletes an evidence record and its stored file.")
    public ResponseEntity<ApiResponse<Void>> deleteEvidence(
            @PathVariable Long id,
            Authentication authentication) {
        evidenceService.deleteEvidence(id, authentication.getName());
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Evidence deleted successfully")
                .data(null)
                .build());
    }
}
