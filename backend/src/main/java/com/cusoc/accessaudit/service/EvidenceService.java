package com.cusoc.accessaudit.service;

import com.cusoc.accessaudit.dto.EvidenceResponse;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface EvidenceService {
    EvidenceResponse uploadAuditEvidence(Long auditId, MultipartFile file, String description, String uploaderEmail);
    List<EvidenceResponse> getEvidenceByAudit(Long auditId);
    EvidenceResponse getEvidenceById(Long id);
    Resource loadEvidenceFile(Long id);
    void deleteEvidence(Long id, String currentUserEmail);
}
