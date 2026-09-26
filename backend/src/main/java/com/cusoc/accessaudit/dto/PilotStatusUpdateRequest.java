package com.cusoc.accessaudit.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PilotStatusUpdateRequest {
    @NotBlank(message = "Status is required")
    private String status;

    @Size(max = 1000, message = "Admin notes must not exceed 1000 characters")
    private String adminNotes;
}
