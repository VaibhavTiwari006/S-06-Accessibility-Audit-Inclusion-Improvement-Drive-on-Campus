package com.cusoc.accessaudit.dto;

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
public class AuditResponseDto {
    private Long id;
    private LocalDate auditDate;
    private double overallAccessibilityScore;
    private String remarks;
    private String status;
    private Long buildingId;
    private String buildingName;
    private Long auditorId;
    private String auditorName;
    private List<AuditResponseItem> responses;
}
