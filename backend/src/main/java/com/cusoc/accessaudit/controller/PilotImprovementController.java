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

import java.util.List;

@RestController
@RequestMapping("/api/pilot-improvements")
@RequiredArgsConstructor
public class PilotImprovementController {

    private final PilotImprovementService pilotImprovementService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PilotImprovementResponse>>> getAll() {
        List<PilotImprovementResponse> pilots = pilotImprovementService.getAll();
        return ResponseEntity.ok(ApiResponse.<List<PilotImprovementResponse>>builder()
                .success(true).message("Pilot improvements fetched").data(pilots).build());
    }

    @GetMapping("/mine")
    public ResponseEntity<ApiResponse<List<PilotImprovementResponse>>> getMyProposals(Authentication authentication) {
        String email = authentication.getName();
        List<PilotImprovementResponse> pilots = pilotImprovementService.getMyProposals(email);
        return ResponseEntity.ok(ApiResponse.<List<PilotImprovementResponse>>builder()
                .success(true).message("My proposals fetched").data(pilots).build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PilotImprovementResponse>> create(
            @Valid @RequestBody PilotImprovementRequest request,
            Authentication authentication) {
        String email = authentication.getName();
        String name = email.contains("@") ? email.split("@")[0] : email;
        PilotImprovementResponse response = pilotImprovementService.create(request, email, name);
        return ResponseEntity.ok(ApiResponse.<PilotImprovementResponse>builder()
                .success(true).message("Pilot improvement proposed successfully").data(response).build());
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<PilotImprovementResponse>> updateStatus(
            @PathVariable Long id,
            @RequestBody PilotStatusUpdateRequest request) {
        PilotImprovementResponse response = pilotImprovementService.updateStatus(id, request);
        return ResponseEntity.ok(ApiResponse.<PilotImprovementResponse>builder()
                .success(true).message("Status updated successfully").data(response).build());
    }
}
