package com.cusoc.accessaudit.controller;

import com.cusoc.accessaudit.dto.PilotImprovementRequest;
import com.cusoc.accessaudit.dto.PilotImprovementResponse;
import com.cusoc.accessaudit.dto.PilotStatusUpdateRequest;
import com.cusoc.accessaudit.response.ApiResponse;
import com.cusoc.accessaudit.service.PilotImprovementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/pilot-improvements")
@RequiredArgsConstructor
public class PilotImprovementController {

    private final PilotImprovementService pilotImprovementService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PilotImprovementResponse>>> getAll() {
        List<PilotImprovementResponse> pilots = pilotImprovementService.getAll();
        return ResponseEntity.ok(ApiResponse.success("Pilot improvements fetched", pilots));
    }

    @GetMapping("/mine")
    public ResponseEntity<ApiResponse<List<PilotImprovementResponse>>> getMyProposals(Authentication authentication) {
        String email = authentication.getName();
        List<PilotImprovementResponse> pilots = pilotImprovementService.getMyProposals(email);
        return ResponseEntity.ok(ApiResponse.success("My proposals fetched", pilots));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PilotImprovementResponse>> create(
            @Valid @RequestBody PilotImprovementRequest request,
            Authentication authentication) {
        String email = authentication.getName();
        // Use email as name fallback
        String name = email.contains("@") ? email.split("@")[0] : email;
        PilotImprovementResponse response = pilotImprovementService.create(request, email, name);
        return ResponseEntity.ok(ApiResponse.success("Pilot improvement proposed successfully", response));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<PilotImprovementResponse>> updateStatus(
            @PathVariable Long id,
            @RequestBody PilotStatusUpdateRequest request) {
        PilotImprovementResponse response = pilotImprovementService.updateStatus(id, request);
        return ResponseEntity.ok(ApiResponse.success("Status updated successfully", response));
    }
}
