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
public class EvidenceResponse {
    private Long id;
    private Long auditId;
    private String originalFileName;
    private String contentType;
    private long fileSize;
    private String description;
    private Long uploadedById;
    private String uploadedByName;
    private String fileUrl;
    private LocalDateTime createdAt;
}
