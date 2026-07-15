package com.cusoc.accessaudit.service.impl;

import com.cusoc.accessaudit.dto.EvidenceResponse;
import com.cusoc.accessaudit.entity.Audit;
import com.cusoc.accessaudit.entity.Evidence;
import com.cusoc.accessaudit.entity.Role;
import com.cusoc.accessaudit.entity.User;
import com.cusoc.accessaudit.exception.ResourceNotFoundException;
import com.cusoc.accessaudit.mapper.EvidenceMapper;
import com.cusoc.accessaudit.repository.AuditRepository;
import com.cusoc.accessaudit.repository.EvidenceRepository;
import com.cusoc.accessaudit.repository.UserRepository;
import com.cusoc.accessaudit.service.EvidenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EvidenceServiceImpl implements EvidenceService {

    private final EvidenceRepository evidenceRepository;
    private final AuditRepository auditRepository;
    private final UserRepository userRepository;
    private final EvidenceMapper evidenceMapper;

    @Value("${app.upload.evidence-dir:uploads/evidence}")
    private String evidenceDirectory;

    @Override
    @Transactional
    public EvidenceResponse uploadAuditEvidence(Long auditId, MultipartFile file, String description, String uploaderEmail) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Evidence file is required");
        }
        if (file.getContentType() == null || !file.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("Only image evidence files are allowed");
        }

        Audit audit = auditRepository.findById(auditId)
                .orElseThrow(() -> new ResourceNotFoundException("Audit not found with id: " + auditId));
        User uploader = getUserByEmail(uploaderEmail);
        requireAdminOrAuditAuditor(uploader, audit);

        String originalFileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String extension = "";
        int dotIndex = originalFileName.lastIndexOf('.');
        if (dotIndex >= 0) {
            extension = originalFileName.substring(dotIndex);
        }
        String storedFileName = UUID.randomUUID() + extension;

        try {
            Path uploadPath = Path.of(evidenceDirectory).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);
            Files.copy(file.getInputStream(), uploadPath.resolve(storedFileName), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new IllegalStateException("Failed to store evidence file", e);
        }

        Evidence evidence = Evidence.builder()
                .audit(audit)
                .uploadedBy(uploader)
                .originalFileName(originalFileName)
                .storedFileName(storedFileName)
                .contentType(file.getContentType())
                .fileSize(file.getSize())
                .description(description)
                .build();

        return evidenceMapper.toResponse(evidenceRepository.save(evidence));
    }

    @Override
    @Transactional(readOnly = true)
    public List<EvidenceResponse> getEvidenceByAudit(Long auditId) {
        if (!auditRepository.existsById(auditId)) {
            throw new ResourceNotFoundException("Audit not found with id: " + auditId);
        }
        return evidenceRepository.findByAuditId(auditId).stream()
                .map(evidenceMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public EvidenceResponse getEvidenceById(Long id) {
        return evidenceMapper.toResponse(getEvidence(id));
    }

    @Override
    @Transactional(readOnly = true)
    public Resource loadEvidenceFile(Long id) {
        Evidence evidence = getEvidence(id);
        try {
            Path filePath = Path.of(evidenceDirectory).toAbsolutePath().normalize().resolve(evidence.getStoredFileName());
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                throw new ResourceNotFoundException("Evidence file not found for id: " + id);
            }
            return resource;
        } catch (MalformedURLException e) {
            throw new ResourceNotFoundException("Evidence file not found for id: " + id);
        }
    }

    @Override
    @Transactional
    public void deleteEvidence(Long id, String currentUserEmail) {
        Evidence evidence = getEvidence(id);
        User currentUser = getUserByEmail(currentUserEmail);
        requireAdminOrAuditAuditor(currentUser, evidence.getAudit());

        try {
            Path filePath = Path.of(evidenceDirectory).toAbsolutePath().normalize().resolve(evidence.getStoredFileName());
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new IllegalStateException("Failed to delete evidence file", e);
        }

        evidenceRepository.delete(evidence);
    }

    private Evidence getEvidence(Long id) {
        return evidenceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Evidence not found with id: " + id));
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Logged in user not found"));
    }

    private void requireAdminOrAuditAuditor(User user, Audit audit) {
        boolean isAdmin = user.getRole() == Role.ADMIN;
        boolean isAuditAuditor = audit.getAuditor() != null && Objects.equals(audit.getAuditor().getId(), user.getId());
        if (!isAdmin && !isAuditAuditor) {
            throw new AccessDeniedException("You do not have permission to manage evidence for this audit");
        }
    }
}
