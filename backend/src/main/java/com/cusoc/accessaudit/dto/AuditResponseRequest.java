package com.cusoc.accessaudit.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditResponseRequest {

    @NotNull(message = "Checklist id is required")
    private Long checklistId;

    @Min(value = 0, message = "Score cannot be negative")
    private int score;

    @Size(max = 2000, message = "Comments cannot exceed 2000 characters")
    private String comments;
}
