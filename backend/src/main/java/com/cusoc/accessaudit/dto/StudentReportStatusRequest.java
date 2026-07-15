package com.cusoc.accessaudit.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentReportStatusRequest {

    @NotBlank(message = "Status is required")
    @Pattern(regexp = "SUBMITTED|UNDER_REVIEW|VERIFIED|REJECTED|RESOLVED", message = "Invalid report status")
    private String status;

    @Size(max = 2000, message = "Admin notes cannot exceed 2000 characters")
    private String adminNotes;
}
