package com.cusoc.accessaudit.mapper;

import com.cusoc.accessaudit.dto.AuditChecklistRequest;
import com.cusoc.accessaudit.dto.AuditChecklistResponse;
import com.cusoc.accessaudit.entity.AuditCategory;
import com.cusoc.accessaudit.entity.AuditChecklist;
import org.springframework.stereotype.Component;

@Component
public class AuditChecklistMapper {

    public AuditChecklistResponse toResponse(AuditChecklist checklist) {
        if (checklist == null) return null;
        return AuditChecklistResponse.builder()
                .id(checklist.getId())
                .question(checklist.getQuestion())
                .maximumScore(checklist.getMaximumScore())
                .categoryId(checklist.getCategory() != null ? checklist.getCategory().getId() : null)
                .categoryName(checklist.getCategory() != null ? checklist.getCategory().getCategoryName() : null)
                .build();
    }

    public AuditChecklist toEntity(AuditChecklistRequest request, AuditCategory category) {
        if (request == null) return null;
        return AuditChecklist.builder()
                .question(request.getQuestion())
                .maximumScore(request.getMaximumScore())
                .category(category)
                .build();
    }

    public void updateEntity(AuditChecklistRequest request, AuditChecklist checklist, AuditCategory category) {
        if (request == null || checklist == null) return;
        checklist.setQuestion(request.getQuestion());
        checklist.setMaximumScore(request.getMaximumScore());
        checklist.setCategory(category);
    }
}
