package com.cusoc.accessaudit.service.impl;

import com.cusoc.accessaudit.dto.AuditCategoryRequest;
import com.cusoc.accessaudit.dto.AuditCategoryResponse;
import com.cusoc.accessaudit.entity.AuditCategory;
import com.cusoc.accessaudit.exception.ResourceNotFoundException;
import com.cusoc.accessaudit.mapper.AuditCategoryMapper;
import com.cusoc.accessaudit.repository.AuditCategoryRepository;
import com.cusoc.accessaudit.service.AuditCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuditCategoryServiceImpl implements AuditCategoryService {

    private final AuditCategoryRepository categoryRepository;
    private final AuditCategoryMapper categoryMapper;

    @Override
    @Transactional
    public AuditCategoryResponse createCategory(AuditCategoryRequest request) {
        if (categoryRepository.existsByCategoryName(request.getCategoryName())) {
            throw new IllegalArgumentException("Category '" + request.getCategoryName() + "' already exists");
        }
        AuditCategory category = categoryMapper.toEntity(request);
        return categoryMapper.toResponse(categoryRepository.save(category));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AuditCategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public AuditCategoryResponse getCategoryById(Long id) {
        AuditCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AuditCategory not found with id: " + id));
        return categoryMapper.toResponse(category);
    }

    @Override
    @Transactional
    public AuditCategoryResponse updateCategory(Long id, AuditCategoryRequest request) {
        AuditCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AuditCategory not found with id: " + id));
        if (categoryRepository.existsByCategoryNameAndIdNot(request.getCategoryName(), id)) {
            throw new IllegalArgumentException("Category name '" + request.getCategoryName() + "' is already in use");
        }
        categoryMapper.updateEntity(request, category);
        return categoryMapper.toResponse(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        AuditCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AuditCategory not found with id: " + id));
        categoryRepository.delete(category);
    }
}
