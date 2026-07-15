package com.cusoc.accessaudit.service;

import com.cusoc.accessaudit.dto.AuditRequest;
import com.cusoc.accessaudit.dto.AuditResponseDto;
import com.cusoc.accessaudit.dto.AuditReviewRequest;

import java.util.List;

public interface AuditService {
    AuditResponseDto createDraft(AuditRequest request, String currentUserEmail);
    List<AuditResponseDto> getAllAudits(Long buildingId, Long auditorId, String status);
    AuditResponseDto getAuditById(Long id);
    AuditResponseDto updateDraft(Long id, AuditRequest request, String currentUserEmail);
    AuditResponseDto submitAudit(Long id, String currentUserEmail);
    AuditResponseDto reviewAudit(Long id, AuditReviewRequest request);
    void deleteAudit(Long id);
}
