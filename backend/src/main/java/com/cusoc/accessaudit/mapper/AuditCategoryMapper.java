package com.cusoc.accessaudit.mapper;

import com.cusoc.accessaudit.dto.AuditCategoryRequest;
import com.cusoc.accessaudit.dto.AuditCategoryResponse;
import com.cusoc.accessaudit.entity.AuditCategory;
import org.springframework.stereotype.Component;

@Component
public class AuditCategoryMapper {

    public AuditCategoryResponse toResponse(AuditCategory category) {
        if (category == null) return null;
        return AuditCategoryResponse.builder()
                .id(category.getId())
                .categoryName(category.getCategoryName())
                .build();
    }

    public AuditCategory toEntity(AuditCategoryRequest request) {
        if (request == null) return null;
        return AuditCategory.builder()
                .categoryName(request.getCategoryName())
                .build();
    }

    public void updateEntity(AuditCategoryRequest request, AuditCategory category) {
        if (request == null || category == null) return;
        category.setCategoryName(request.getCategoryName());
    }
}
