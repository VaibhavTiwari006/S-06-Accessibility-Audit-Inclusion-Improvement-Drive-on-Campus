package com.cusoc.accessaudit.controller;

import com.cusoc.accessaudit.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Tag(name = "Reports", description = "Endpoints for exporting accessibility compliance reports in PDF format")
@SecurityRequirement(name = "Bearer Authentication")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/campus")
    @PreAuthorize("hasAnyRole('ADMIN','AUDITOR')")
    @Operation(summary = "Export overall campus accessibility report", description = "Generates and downloads a campus-wide PDF accessibility compliance report.")
    public ResponseEntity<byte[]> exportCampusReport() {
        byte[] pdfBytes = reportService.generateCampusAccessibilityReport();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "campus-accessibility-report.pdf");
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
    }

    @GetMapping("/building/{buildingId}")
    @PreAuthorize("hasAnyRole('ADMIN','AUDITOR')")
    @Operation(summary = "Export building-specific accessibility report", description = "Generates and downloads a building-specific PDF accessibility compliance report.")
    public ResponseEntity<byte[]> exportBuildingReport(@PathVariable Long buildingId) {
        byte[] pdfBytes = reportService.generateBuildingAccessibilityReport(buildingId);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "building-accessibility-report-" + buildingId + ".pdf");
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
    }
    @GetMapping("/advocacy")
    @PreAuthorize("hasAnyRole('ADMIN')")
    @Operation(summary = "Export Advocacy Letter", description = "Generates and downloads the Prioritized Remediation Roadmap & Advocacy Letter.")
    public ResponseEntity<byte[]> exportAdvocacyLetter() {
        byte[] pdfBytes = reportService.generateAdvocacyLetter();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "advocacy-letter-roadmap.pdf");
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
    }
}
