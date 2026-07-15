package com.cusoc.accessaudit.service.impl;

import com.cusoc.accessaudit.dto.AuditRequest;
import com.cusoc.accessaudit.dto.AuditResponseDto;
import com.cusoc.accessaudit.dto.AuditResponseRequest;
import com.cusoc.accessaudit.dto.AuditReviewRequest;
import com.cusoc.accessaudit.entity.Audit;
import com.cusoc.accessaudit.entity.AuditChecklist;
import com.cusoc.accessaudit.entity.AuditResponse;
import com.cusoc.accessaudit.entity.Building;
import com.cusoc.accessaudit.entity.Role;
import com.cusoc.accessaudit.entity.User;
import com.cusoc.accessaudit.exception.ResourceNotFoundException;
import com.cusoc.accessaudit.mapper.AuditMapper;
import com.cusoc.accessaudit.repository.AuditChecklistRepository;
import com.cusoc.accessaudit.repository.AuditRepository;
import com.cusoc.accessaudit.repository.BuildingRepository;
import com.cusoc.accessaudit.repository.UserRepository;
import com.cusoc.accessaudit.service.AuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuditServiceImpl implements AuditService {

    private static final String STATUS_DRAFT = "DRAFT";
    private static final String STATUS_SUBMITTED = "SUBMITTED";

    private final AuditRepository auditRepository;
    private final BuildingRepository buildingRepository;
    private final UserRepository userRepository;
    private final AuditChecklistRepository checklistRepository;
    private final AuditMapper auditMapper;

    @Override
    @Transactional
    public AuditResponseDto createDraft(AuditRequest request, String currentUserEmail) {
        User currentUser = getCurrentUser(currentUserEmail);
        User auditor = getAuditor(request.getAuditorId());
        requireAdminOrSameAuditor(currentUser, auditor);

        Building building = buildingRepository.findById(request.getBuildingId())
                .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + request.getBuildingId()));

        Audit audit = Audit.builder()
                .auditDate(request.getAuditDate() != null ? request.getAuditDate() : LocalDate.now())
                .remarks(request.getRemarks())
                .status(STATUS_DRAFT)
                .building(building)
                .auditor(auditor)
                .build();

        replaceResponses(audit, request.getResponses());
        calculateScore(audit);
        return auditMapper.toResponse(auditRepository.save(audit));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AuditResponseDto> getAllAudits(Long buildingId, Long auditorId, String status) {
        return auditRepository.findAll().stream()
                .filter(audit -> buildingId == null || Objects.equals(audit.getBuilding().getId(), buildingId))
                .filter(audit -> auditorId == null || Objects.equals(audit.getAuditor().getId(), auditorId))
                .filter(audit -> status == null || audit.getStatus().equalsIgnoreCase(status))
                .map(auditMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public AuditResponseDto getAuditById(Long id) {
        return auditMapper.toResponse(getAudit(id));
    }

    @Override
    @Transactional
    public AuditResponseDto updateDraft(Long id, AuditRequest request, String currentUserEmail) {
        Audit audit = getAudit(id);
        if (!STATUS_DRAFT.equals(audit.getStatus())) {
            throw new IllegalArgumentException("Only draft audits can be updated");
        }

        User currentUser = getCurrentUser(currentUserEmail);
        requireAdminOrSameAuditor(currentUser, audit.getAuditor());

        Building building = buildingRepository.findById(request.getBuildingId())
                .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + request.getBuildingId()));
        User auditor = getAuditor(request.getAuditorId());
        requireAdminOrSameAuditor(currentUser, auditor);

        audit.setAuditDate(request.getAuditDate() != null ? request.getAuditDate() : audit.getAuditDate());
        audit.setRemarks(request.getRemarks());
        audit.setBuilding(building);
        audit.setAuditor(auditor);
        replaceResponses(audit, request.getResponses());
        calculateScore(audit);

        return auditMapper.toResponse(auditRepository.save(audit));
    }

    @Override
    @Transactional
    public AuditResponseDto submitAudit(Long id, String currentUserEmail) {
        Audit audit = getAudit(id);
        User currentUser = getCurrentUser(currentUserEmail);
        requireAdminOrSameAuditor(currentUser, audit.getAuditor());

        if (audit.getResponses().isEmpty()) {
            throw new IllegalArgumentException("Audit must include at least one checklist response before submission");
        }

        audit.setStatus(STATUS_SUBMITTED);
        calculateScore(audit);
        return auditMapper.toResponse(auditRepository.save(audit));
    }

    @Override
    @Transactional
    public AuditResponseDto reviewAudit(Long id, AuditReviewRequest request) {
        Audit audit = getAudit(id);
        if (!STATUS_SUBMITTED.equals(audit.getStatus())) {
            throw new IllegalArgumentException("Only submitted audits can be reviewed");
        }
        audit.setStatus(request.getStatus());
        if (request.getRemarks() != null) {
            audit.setRemarks(request.getRemarks());
        }
        return auditMapper.toResponse(auditRepository.save(audit));
    }

    @Override
    @Transactional
    public void deleteAudit(Long id) {
        Audit audit = getAudit(id);
        auditRepository.delete(audit);
    }

    private Audit getAudit(Long id) {
        return auditRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Audit not found with id: " + id));
    }

    private User getCurrentUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Logged in user not found"));
    }

    private User getAuditor(Long auditorId) {
        User auditor = userRepository.findById(auditorId)
                .orElseThrow(() -> new ResourceNotFoundException("Auditor not found with id: " + auditorId));
        if (auditor.getRole() != Role.AUDITOR && auditor.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("Assigned user must have AUDITOR or ADMIN role");
        }
        return auditor;
    }

    private void requireAdminOrSameAuditor(User currentUser, User auditor) {
        if (currentUser.getRole() != Role.ADMIN && !Objects.equals(currentUser.getId(), auditor.getId())) {
            throw new AccessDeniedException("You do not have permission to manage this audit");
        }
    }

    private void replaceResponses(Audit audit, List<AuditResponseRequest> responseRequests) {
        audit.getResponses().clear();
        if (responseRequests == null) {
            return;
        }

        for (AuditResponseRequest responseRequest : responseRequests) {
            AuditChecklist checklist = checklistRepository.findById(responseRequest.getChecklistId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "AuditChecklist not found with id: " + responseRequest.getChecklistId()));

            if (responseRequest.getScore() > checklist.getMaximumScore()) {
                throw new IllegalArgumentException("Score for checklist id " + checklist.getId()
                        + " cannot exceed maximum score " + checklist.getMaximumScore());
            }

            audit.getResponses().add(AuditResponse.builder()
                    .audit(audit)
                    .checklist(checklist)
                    .score(responseRequest.getScore())
                    .comments(responseRequest.getComments())
                    .build());
        }
    }

    private void calculateScore(Audit audit) {
        int maximumScore = audit.getResponses().stream()
                .mapToInt(response -> response.getChecklist().getMaximumScore())
                .sum();
        int earnedScore = audit.getResponses().stream()
                .mapToInt(AuditResponse::getScore)
                .sum();

        audit.setOverallAccessibilityScore(maximumScore == 0 ? 0.0 : (earnedScore * 100.0) / maximumScore);
    }
}
