package com.cusoc.accessaudit.service;

import com.cusoc.accessaudit.dto.AuditChecklistRequest;
import com.cusoc.accessaudit.dto.AuditChecklistResponse;

import java.util.List;

/**
 * AuditChecklistService Interface
 * 
 * Service contract for managing audit checklists questions.
 * Handles the mapping and business verification rules.
 */
public interface AuditChecklistService {
    AuditChecklistResponse createChecklist(AuditChecklistRequest request);
    List<AuditChecklistResponse> getAllChecklists();
    List<AuditChecklistResponse> getChecklistsByCategory(Long categoryId);
    AuditChecklistResponse getChecklistById(Long id);
    AuditChecklistResponse updateChecklist(Long id, AuditChecklistRequest request);
    void deleteChecklist(Long id);
}
