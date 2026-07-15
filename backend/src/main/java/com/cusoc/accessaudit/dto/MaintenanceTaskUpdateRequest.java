package com.cusoc.accessaudit.dto;

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
public class MaintenanceTaskUpdateRequest {

    @Pattern(regexp = "OPEN|IN_PROGRESS|BLOCKED|COMPLETED|CANCELLED", message = "Invalid task status")
    private String status;

    @Pattern(regexp = "LOW|MEDIUM|HIGH|CRITICAL", message = "Invalid severity")
    private String severity;

    @Pattern(regexp = "LOW|MEDIUM|HIGH|URGENT", message = "Invalid priority")
    private String priority;

    private Long assigneeId;
    private LocalDate dueDate;

    @Size(max = 2000, message = "Completion notes cannot exceed 2000 characters")
    private String completionNotes;

    @Size(max = 1000, message = "Completion photo URL cannot exceed 1000 characters")
    private String completionPhotoUrl;
}
