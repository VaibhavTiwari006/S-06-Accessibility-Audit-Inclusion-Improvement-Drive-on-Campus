package com.cusoc.accessaudit.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceTaskResponse {
    private Long id;
    private String title;
    private String description;
    private String status;
    private String severity;
    private String priority;
    private LocalDate dueDate;
    private String completionNotes;
    private String completionPhotoUrl;
    private Long buildingId;
    private String buildingName;
    private Long assigneeId;
    private String assigneeName;
    private Long sourceAuditId;
    private Long sourceReportId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Double estimatedCost;
}
