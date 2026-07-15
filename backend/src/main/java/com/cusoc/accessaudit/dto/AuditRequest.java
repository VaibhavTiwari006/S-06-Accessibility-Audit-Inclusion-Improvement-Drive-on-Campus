package com.cusoc.accessaudit.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditRequest {

    @NotNull(message = "Building id is required")
    private Long buildingId;

    @NotNull(message = "Auditor id is required")
    private Long auditorId;

    private LocalDate auditDate;

    @Size(max = 2000, message = "Remarks cannot exceed 2000 characters")
    private String remarks;

    @Valid
    private List<AuditResponseRequest> responses;
}
