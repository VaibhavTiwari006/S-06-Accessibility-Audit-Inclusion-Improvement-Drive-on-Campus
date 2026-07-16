package com.cusoc.accessaudit.mapper;

import com.cusoc.accessaudit.dto.PilotImprovementResponse;
import com.cusoc.accessaudit.entity.PilotImprovement;
import org.springframework.stereotype.Component;

@Component
public class PilotImprovementMapper {

    public PilotImprovementResponse toResponse(PilotImprovement pilot) {
        if (pilot == null) return null;
        PilotImprovementResponse dto = new PilotImprovementResponse();
        dto.setId(pilot.getId());
        dto.setTitle(pilot.getTitle());
        dto.setDescription(pilot.getDescription());
        dto.setLocation(pilot.getLocation());
        dto.setEstimatedCost(pilot.getEstimatedCost());
        dto.setImpactLevel(pilot.getImpactLevel());
        dto.setStatus(pilot.getStatus());
        dto.setProposerName(pilot.getProposerName());
        dto.setProposerEmail(pilot.getProposerEmail());
        dto.setAdminNotes(pilot.getAdminNotes());
        dto.setCategory(pilot.getCategory());
        dto.setCreatedAt(pilot.getCreatedAt());
        dto.setUpdatedAt(pilot.getUpdatedAt());
        return dto;
    }
}
