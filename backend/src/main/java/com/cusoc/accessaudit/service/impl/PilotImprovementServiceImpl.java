package com.cusoc.accessaudit.service.impl;

import com.cusoc.accessaudit.dto.PilotImprovementRequest;
import com.cusoc.accessaudit.dto.PilotImprovementResponse;
import com.cusoc.accessaudit.dto.PilotStatusUpdateRequest;
import com.cusoc.accessaudit.entity.PilotImprovement;
import com.cusoc.accessaudit.exception.ResourceNotFoundException;
import com.cusoc.accessaudit.mapper.PilotImprovementMapper;
import com.cusoc.accessaudit.repository.PilotImprovementRepository;
import com.cusoc.accessaudit.service.PilotImprovementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PilotImprovementServiceImpl implements PilotImprovementService {

    private final PilotImprovementRepository pilotImprovementRepository;
    private final PilotImprovementMapper pilotImprovementMapper;

    @Override
    public List<PilotImprovementResponse> getAll() {
        return pilotImprovementRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(pilotImprovementMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PilotImprovementResponse create(PilotImprovementRequest request, String userEmail, String userName) {
        PilotImprovement pilot = PilotImprovement.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .location(request.getLocation())
                .estimatedCost(request.getEstimatedCost())
                .impactLevel(request.getImpactLevel() != null ? request.getImpactLevel() : "MEDIUM")
                .category(request.getCategory() != null ? request.getCategory() : "OTHER")
                .status("PROPOSED")
                .proposerName(userName)
                .proposerEmail(userEmail)
                .build();

        PilotImprovement saved = pilotImprovementRepository.save(pilot);
        return pilotImprovementMapper.toResponse(saved);
    }

    @Override
    public PilotImprovementResponse updateStatus(Long id, PilotStatusUpdateRequest request) {
        PilotImprovement pilot = pilotImprovementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pilot improvement not found with id: " + id));

        if (request.getStatus() != null) pilot.setStatus(request.getStatus());
        if (request.getAdminNotes() != null) pilot.setAdminNotes(request.getAdminNotes());

        PilotImprovement updated = pilotImprovementRepository.save(pilot);
        return pilotImprovementMapper.toResponse(updated);
    }

    @Override
    public List<PilotImprovementResponse> getMyProposals(String email) {
        return pilotImprovementRepository.findByProposerEmailOrderByCreatedAtDesc(email)
                .stream()
                .map(pilotImprovementMapper::toResponse)
                .collect(Collectors.toList());
    }
}
