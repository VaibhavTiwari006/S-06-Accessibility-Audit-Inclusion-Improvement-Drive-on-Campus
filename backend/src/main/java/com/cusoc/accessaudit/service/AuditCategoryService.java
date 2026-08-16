package com.cusoc.accessaudit.service;

import com.cusoc.accessaudit.dto.AuditCategoryRequest;
import com.cusoc.accessaudit.dto.AuditCategoryResponse;

import java.util.List;

/**
 * AuditCategoryService Interface
 * 
 * Service contract for managing audit category data models.
 * Mapped to AuditCategoryController requests.
 */
public interface AuditCategoryService {
    AuditCategoryResponse createCategory(AuditCategoryRequest request);
    List<AuditCategoryResponse> getAllCategories();
    AuditCategoryResponse getCategoryById(Long id);
    AuditCategoryResponse updateCategory(Long id, AuditCategoryRequest request);
    void deleteCategory(Long id);
}
