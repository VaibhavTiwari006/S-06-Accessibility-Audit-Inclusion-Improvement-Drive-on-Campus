package com.cusoc.accessaudit.service;

import com.cusoc.accessaudit.dto.AuditChecklistRequest;
import com.cusoc.accessaudit.dto.AuditChecklistResponse;

import java.util.List;

public interface AuditChecklistService {
    AuditChecklistResponse createChecklist(AuditChecklistRequest request);
    List<AuditChecklistResponse> getAllChecklists();
    List<AuditChecklistResponse> getChecklistsByCategory(Long categoryId);
    AuditChecklistResponse getChecklistById(Long id);
    AuditChecklistResponse updateChecklist(Long id, AuditChecklistRequest request);
    void deleteChecklist(Long id);
}
