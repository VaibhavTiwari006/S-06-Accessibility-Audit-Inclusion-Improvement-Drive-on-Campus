package com.cusoc.accessaudit.service.impl;

import com.cusoc.accessaudit.dto.AuditChecklistRequest;
import com.cusoc.accessaudit.dto.AuditChecklistResponse;
import com.cusoc.accessaudit.entity.AuditCategory;
import com.cusoc.accessaudit.entity.AuditChecklist;
import com.cusoc.accessaudit.exception.ResourceNotFoundException;
import com.cusoc.accessaudit.mapper.AuditChecklistMapper;
import com.cusoc.accessaudit.repository.AuditCategoryRepository;
import com.cusoc.accessaudit.repository.AuditChecklistRepository;
import com.cusoc.accessaudit.service.AuditChecklistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuditChecklistServiceImpl implements AuditChecklistService {

    private final AuditChecklistRepository checklistRepository;
    private final AuditCategoryRepository categoryRepository;
    private final AuditChecklistMapper checklistMapper;

    @Override
    @Transactional
    public AuditChecklistResponse createChecklist(AuditChecklistRequest request) {
        AuditCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "AuditCategory not found with id: " + request.getCategoryId()));

        if (checklistRepository.existsByQuestionAndCategoryId(request.getQuestion(), request.getCategoryId())) {
            throw new IllegalArgumentException("This question already exists in the selected category");
        }

        AuditChecklist checklist = checklistMapper.toEntity(request, category);
        return checklistMapper.toResponse(checklistRepository.save(checklist));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AuditChecklistResponse> getAllChecklists() {
        return checklistRepository.findAll().stream()
                .map(checklistMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AuditChecklistResponse> getChecklistsByCategory(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("AuditCategory not found with id: " + categoryId);
        }
        return checklistRepository.findByCategoryId(categoryId).stream()
                .map(checklistMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public AuditChecklistResponse getChecklistById(Long id) {
        AuditChecklist checklist = checklistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AuditChecklist not found with id: " + id));
        return checklistMapper.toResponse(checklist);
    }

    @Override
    @Transactional
    public AuditChecklistResponse updateChecklist(Long id, AuditChecklistRequest request) {
        AuditChecklist checklist = checklistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AuditChecklist not found with id: " + id));

        AuditCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "AuditCategory not found with id: " + request.getCategoryId()));

        if (checklistRepository.existsByQuestionAndCategoryIdAndIdNot(
                request.getQuestion(), request.getCategoryId(), id)) {
            throw new IllegalArgumentException("This question already exists in the selected category");
        }

        checklistMapper.updateEntity(request, checklist, category);
        return checklistMapper.toResponse(checklistRepository.save(checklist));
    }

    @Override
    @Transactional
    public void deleteChecklist(Long id) {
        AuditChecklist checklist = checklistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AuditChecklist not found with id: " + id));
        checklistRepository.delete(checklist);
    }
}
