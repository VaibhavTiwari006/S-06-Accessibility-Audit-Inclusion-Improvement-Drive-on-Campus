package com.cusoc.accessaudit.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditChecklistRequest {

    @NotBlank(message = "Question is required")
    @Size(max = 1000, message = "Question must not exceed 1000 characters")
    private String question;

    @NotNull(message = "Maximum score is required")
    @Min(value = 1, message = "Maximum score must be at least 1")
    private Integer maximumScore;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    @Size(max = 500, message = "Standard reference must not exceed 500 characters")
    private String standardReference;
}
