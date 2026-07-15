package com.cusoc.accessaudit.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentReportResponse {
    private Long id;
    private Long buildingId;
    private String buildingName;
    private Long reporterId;
    private String reporterName;
    private String description;
    private String locationDetails;
    private String photoUrl;
    private String status;
    private String adminNotes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
