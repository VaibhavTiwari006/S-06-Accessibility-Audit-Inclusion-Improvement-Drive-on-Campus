package com.cusoc.accessaudit.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceTaskRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title cannot exceed 200 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(max = 2000, message = "Description cannot exceed 2000 characters")
    private String description;

    private Long buildingId;
    private Long assigneeId;
    private Long sourceAuditId;
    private Long sourceReportId;

    @Pattern(regexp = "LOW|MEDIUM|HIGH|CRITICAL", message = "Invalid severity")
    private String severity;

    @Pattern(regexp = "LOW|MEDIUM|HIGH|URGENT", message = "Invalid priority")
    private String priority;

    private LocalDate dueDate;
}
