package com.cusoc.accessaudit.mapper;

import com.cusoc.accessaudit.dto.EvidenceResponse;
import com.cusoc.accessaudit.entity.Evidence;
import org.springframework.stereotype.Component;

@Component
public class EvidenceMapper {

    public EvidenceResponse toResponse(Evidence evidence) {
        if (evidence == null) {
            return null;
        }

        return EvidenceResponse.builder()
                .id(evidence.getId())
                .auditId(evidence.getAudit() != null ? evidence.getAudit().getId() : null)
                .originalFileName(evidence.getOriginalFileName())
                .contentType(evidence.getContentType())
                .fileSize(evidence.getFileSize())
                .description(evidence.getDescription())
                .uploadedById(evidence.getUploadedBy() != null ? evidence.getUploadedBy().getId() : null)
                .uploadedByName(evidence.getUploadedBy() != null ? evidence.getUploadedBy().getFullName() : null)
                .fileUrl("/api/evidence/" + evidence.getId() + "/file")
                .createdAt(evidence.getCreatedAt())
                .build();
    }
}
