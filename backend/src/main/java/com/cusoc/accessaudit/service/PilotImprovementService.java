package com.cusoc.accessaudit.service;

import com.cusoc.accessaudit.dto.PilotImprovementRequest;
import com.cusoc.accessaudit.dto.PilotImprovementResponse;
import com.cusoc.accessaudit.dto.PilotStatusUpdateRequest;

import java.util.List;

public interface PilotImprovementService {
    List<PilotImprovementResponse> getAll(String currentUserEmail);
    PilotImprovementResponse create(PilotImprovementRequest request, String userEmail, String userName);
    PilotImprovementResponse updateStatus(Long id, PilotStatusUpdateRequest request, String currentUserEmail);
    List<PilotImprovementResponse> getMyProposals(String email);
    PilotImprovementResponse toggleUpvote(Long id, String userEmail);
}
