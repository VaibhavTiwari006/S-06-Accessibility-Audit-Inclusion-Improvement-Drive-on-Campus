package com.cusoc.accessaudit.mapper;

import com.cusoc.accessaudit.dto.AuditResponseDto;
import com.cusoc.accessaudit.dto.AuditResponseItem;
import com.cusoc.accessaudit.entity.Audit;
import com.cusoc.accessaudit.entity.AuditResponse;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class AuditMapper {

    public AuditResponseDto toResponse(Audit audit) {
        if (audit == null) {
            return null;
        }

        return AuditResponseDto.builder()
                .id(audit.getId())
                .auditDate(audit.getAuditDate())
                .overallAccessibilityScore(audit.getOverallAccessibilityScore())
                .remarks(audit.getRemarks())
                .status(audit.getStatus())
                .buildingId(audit.getBuilding() != null ? audit.getBuilding().getId() : null)
                .buildingName(audit.getBuilding() != null ? audit.getBuilding().getBuildingName() : null)
                .auditorId(audit.getAuditor() != null ? audit.getAuditor().getId() : null)
                .auditorName(audit.getAuditor() != null ? audit.getAuditor().getFullName() : null)
                .responses(audit.getResponses().stream()
                        .map(this::toResponseItem)
                        .collect(Collectors.toList()))
                .build();
    }

    private AuditResponseItem toResponseItem(AuditResponse response) {
        return AuditResponseItem.builder()
                .id(response.getId())
                .checklistId(response.getChecklist() != null ? response.getChecklist().getId() : null)
                .checklistQuestion(response.getChecklist() != null ? response.getChecklist().getQuestion() : null)
                .maximumScore(response.getChecklist() != null ? response.getChecklist().getMaximumScore() : null)
                .categoryId(response.getChecklist() != null && response.getChecklist().getCategory() != null
                        ? response.getChecklist().getCategory().getId()
                        : null)
                .categoryName(response.getChecklist() != null && response.getChecklist().getCategory() != null
                        ? response.getChecklist().getCategory().getCategoryName()
                        : null)
                .score(response.getScore())
                .comments(response.getComments())
                .build();
    }
}
